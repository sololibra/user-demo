<template>
  <div class="k-2kibew">
    <div class="k-2kibew-add">
      <el-cascader
        v-model="parentId"
        :options="navTree"
        :props="{ checkStrictly: true, label: 'name', value: '_id' }"
        clearable
      ></el-cascader>
      <el-button type="primary" class="k-2kibew-btn" @click="addMenu"
        >Add</el-button
      >
    </div>
    <el-table
      :data="menuTree"
      style="width: 100%;margin-bottom: 20px;"
      row-key="_id"
      max-height="450"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column
        v-for="item in tableMenu"
        :key="item._id"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :type="item.type"
        :formatter="item.formatter"
      >
      </el-table-column>
      <el-table-column label="MENU TYPE" align="center">
        <template slot-scope="{row}">
          <span v-if="row.menuType == 1">Menu</span>
          <span v-if="row.menuType == 2">Button</span>
        </template>
      </el-table-column>
      <el-table-column label="OPERATE" width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="editMenu(scope.row)">
            Edit
          </el-button>
          <el-button type="danger" size="mini" @click="delMenu(scope.row)">
            Del
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 菜单编辑新增dialog -->
    <el-dialog
      :title="action ? 'Edit menu' : 'Add menu'"
      :visible.sync="menuVisible"
    >
      <el-form ref="menuForm" :rules="menuRule" :model="menuForm" label-width="80px">
        <el-form-item label="NAME" prop="name">
          <el-input v-model="menuForm.name"></el-input>
        </el-form-item>
        <el-form-item label="Router" v-show="menuForm.menuType==1" prop="url">
          <el-input v-model="menuForm.url"></el-input>
        </el-form-item>
        <el-form-item v-show="menuForm.menuType==2" label="LABEL" prop="limitCode">
          <el-input v-model="menuForm.limitCode"></el-input>
        </el-form-item>
        <el-form-item label="ICON" v-show="menuForm.menuType==1" prop="icon">
          <el-input v-model="menuForm.icon"></el-input>
        </el-form-item>
        <el-form-item label="SORT" prop="orderNum">
          <el-input v-model="menuForm.orderNum"></el-input>
        </el-form-item>
        <el-form-item label="TYPE" prop="menuType">
          <el-radio v-model="menuForm.menuType" label="1">Menu</el-radio>
          <el-radio v-model="menuForm.menuType" label="2">Button</el-radio>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirm">Confirm</el-button>
          <el-button @click="cancel">Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<style lang="less" src="../less/menu.less"></style>
<script>
import Vue from "vue";
import addRoutes from "@/router/addRouter";
import router from "@/router";
Vue.prototype.$ELEMENT = { size: "small", zIndex: 3000 };
import {
  Tree,
  Button,
  Cascader,
  MessageBox,
  Message,
  Dialog,
  Form,
  FormItem,
  Select,
  Option,
  Input,
  Radio,
  Table,
  TableColumn,
} from "element-ui";
Vue.use(Tree);
Vue.use(Button);
Vue.use(Cascader);
Vue.use(Dialog);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Select);
Vue.use(Option);
Vue.use(Radio);
Vue.use(Input);
Vue.use(Table);
Vue.use(TableColumn);
Vue.prototype.$message = Message;
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      formLabelWidth: "200",
      parentId: null,
      menuForm: {
        name: "",
        url: "",
        icon: "",
        orderNum: "",
        menuType: "1",
      },
      menuVisible: false,
      menuTree: [],
      action: 0, //0:新增菜单，1:编辑菜单
      tableMenu: [
        {
          label: "id",
          prop: "id",
          //type设置空值可以使树形表格箭头移到后一项
          type:"",
          width:50
        },
        {
          label: "Name",
          prop: "name",
        },
        {
          label: "icon",
          prop: "icon",
        },
        {
          label: "Router",
          prop: "url",
        },
        {
          label: "Sort",
          prop: "orderNum",
        }
      ],
      menuRule:{
        name: [
          { required: true, message: "Please enter a menu name", trigger: "blur" },
          { min: 2, max: 20, message: "2 to 10 characters long", trigger: "change" },
        ],
        url: [
          { required: true, message: "Please enter route", trigger: "blur" },
        ]
      }
    };
  },
  computed: {
    ...mapState("navMenu", ["navTree"]),
  },
  watch:{
    //1 Menu | 2 Button
    "menuForm.menuType":(val)=>{
      console.log(val)
    }
  },
  methods: {
    ...mapActions("navMenu", ["addMenuList"]),
    //delete menu
    async delMenu(dat) {
      try {
        await MessageBox.confirm("This action will delete the menu, do you want to continue?", "Prompt", {
          confirmButtonText: "confirm",
          cancelButtonText: "cancel",
          type: "warning",
        });
        const { errorCode } = await this.$http.delMenuList({ _id: dat._id });
        if (errorCode === "0000") {
          this.$message({
            type: "success",
            message: "Successfully deleted",
          });
          this.parentId = null;
          //refresh menu
          this.menuTree = await this.addMenuList();
        }
      } catch (err) {
        console.log(err);
      }
    },
    //query menu
    async queryMenu() {
      this.menuTree = await this.addMenuList();
      console.log(this.menuTree)
    },
    //add
    addMenu() {
      this.action = 0;
      this.menuVisible = true;
    },
    //edit
    editMenu(dat) {
      const { name, url, icon, orderNum, _id, parentId } = dat;
      const menuType = dat.menuType.toString();
       //Wait for the page rendering to complete before assigning, otherwise reset Fields resets the assigned data
      this.$nextTick(()=>{
      this.menuForm = { name, url, icon, orderNum, menuType, _id, parentId };
      this.action = 1;
      })
      this.menuVisible = true;
    },
    async confirm() {
      console.log(this.parentId);
      const { errorCode } = await this.$http.addMenuList({
        parentId: this.parentId
          ? this.parentId[this.parentId.length - 1]
          : null,
        action: this.action,
        ...this.menuForm,
      });
      if (errorCode === "0000") {
        this.$message({
          showClose: true,
          message: "Added successfully",
          type: "success",
        });
        //Reset form query menu
        this.menuVisible = false;
        this.$refs["menuForm"].resetFields();
        this.menuTree = await this.addMenuList();
        //ADD ROUTE
        let routes = await addRoutes(this.menuTree);
        for (let childRoutes of routes) {
          //Add a sub-route for the route named 'Home' (if you don't add it, click on the menu to find the route and you must refresh the page to work properly)
          router.addRoute("HomePage", childRoutes);
        }
      }
    },
    cancel() {
      this.menuVisible = false;
      this.$refs["menuForm"].resetFields();
    },
  },
  created() {
    this.queryMenu();
  },
};
</script>
