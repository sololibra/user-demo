<template>
  <div class="k-9sptci">
    <el-form
      ref="userForm"
      :inline="true"
      class="k-9sptci-header"
      :model="userForm"
    >
      <el-form-item label="Name" prop="username">
        <el-input placeholder="name" v-model="userForm.username" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="Mobile" prop="mobile">
        <el-input placeholder="mobile" v-model="userForm.mobile" maxlength="11"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="handleQuery">Search</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary " perm="user-add" @click="addUser">Add new</el-button>
      </el-form-item>
      <el-form-item>
          <el-button type="danger" @click="handleReset($refs['userForm'])">Reset</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="userTable"
      style="margin-top:20px"
      @selection-change="handleSelect"
    >
      <el-table-column
        v-for="item in userList"
        :key="item._id"
        :prop="item.prop"
        :type="item.type"
        :label="item.label"
        :width="item.width"
        :formatter="item.formatter"
        :sortable="item.sortable"
      >
      </el-table-column>
      <el-table-column  label="ROLE">
        <template slot-scope="scope">
          <el-select disabled :value="scope.row.roleNames" multiple placeholder="Please select..">
            <el-option
              v-for="item in roleList"
              :key="item._id"
              :label="item.roleName"
              :value="item._id"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="OPERATE" fixed="right" width="150">
        <template slot-scope="scope">
          <per-button size="mini" perm="user-edit" @click="handleEdit(scope.row)">Edit</per-button>
          <per-button size="mini" perm="user-del" type="danger" @click="handleDel(scope.row)"
            >Del</per-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="k-9sptci-footer">
      <per-button type="danger" @click="batchDelete">Batch deletion</per-button>
      <el-pagination
        @current-change="handleQuery"
        :current-page.sync="pager.pageNum"
        layout="prev, pager, next"
        :total="pager.total"
      >
      </el-pagination>
    </div>
    <el-dialog
      :title="action ? 'Edit user' : 'Add user'"
      :visible.sync="userVisible"
    >
      <el-form ref="userForm" :model="userParams" label-width="100px">
        <el-form-item label="Name" prop="username" :rules="[{required:true,message:'Please enter the account name'},{min:2,max:20,trigger:'change',message:'Length 2-20'}]">
          <el-input v-model="userParams.username" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password" :rules="[{required:true,message:'Please enter the password'},{min:6,max:20,trigger:'change',message:'Length 6-20'}]">
          <el-input v-model="userParams.password" type="password" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="Email" prop="userEmail" :rules="[{required:true,message:'Please enter your email'},{type:'email',message:'Please input your email'},{min:6}]">
          <el-input v-model="userParams.userEmail"></el-input>
        </el-form-item>
        <el-form-item label="Mobile" prop="mobile" :rules="[{required:true,message:'Please enter your phone number'},{pattern:/^1[356789]\d{9}$/}]">
          <el-input v-model="userParams.mobile"></el-input>
        </el-form-item>
        <el-form-item label="Gender" prop="sex">
         <el-select v-model="userParams.sex"> 
           <el-option label="Male" :value="0"></el-option>
           <el-option label="Female" :value="1"></el-option>
         </el-select>
        </el-form-item>
        <el-form-item label="Role" prop="roleNames">
          <el-select
            v-model="userParams.roleNames"
            multiple
            placeholder="Please select"
          >
            <el-option
              v-for="item in roleList"
              :key="item._id"
              :label="item.roleName"
              :value="item._id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="confirm('userForm')">Submit</el-button>
          <el-button @click="cancel">Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import Vue from "vue";
import {
  Form,
  FormItem,
  Input,
  Button,
  Table,
  TableColumn,
  Pagination,
  MessageBox,
  Message,
  Dialog,
  Select,
  Option,
} from "element-ui";
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Button);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Select);
Vue.use(Option);
Vue.prototype.$message = Message;
Vue.prototype.$ELEMENT = { size: "small", zIndex: 3000 };
import { mapState, mapActions } from "vuex";
import perButton from "@/components/perm/perButton"
export default {
  components:{
    perButton
  },
  data() {
    return {
      ids: [],
      action: 0,
      userParams: {
        username: "",
        mobile: "",
        userEmail: "",
        password: "",
        roleNames: [],
      },
      userVisible: false,
      userList: [
        {
          type: "selection",
          width: 55,
        },
        {
          prop: "username",
          label: "NAME",
          sortable:true
        },
        {
          prop: "mobile",
          label: "MOBILE",
          sortable:false
        },
        {
          prop: "userEmail",
          label: "EMAIL",
          sortable:false
        },
        {
          prop: "sex",
          label: "GENDER",
          formatter: (...rest) => {
            return {
              0: "Male",
              1: "Female",
            }[rest[2]];
          },
        }
      ],
      roleList: [],
    };
  },
  computed: {
    ...mapState("user", ["userForm", "userTable", "pager"]),
  },
  methods: {
    addUser() {
      this.action = 0;
      this.userVisible = true;
    },
    //add user
    async confirm(formName) {
      this.$_submit(this.$refs[formName],()=>{
        const { errorCode } = this.$http.addUser({
          ...this.userParams,
          action: this.action,
        });
        if (errorCode === "0000") {
          this.$message({
            type: "success",
            message: "Successful operation",
          });
          this.handleQuery();
          this.$refs["userForm"].resetFields();
          this.userVisible = false;
        }
      })

    },
    cancel() {
      this.$refs["userForm"].resetFields();
      this.userVisible = false;
    },
    ...mapActions("user", ["handleQuery", "handleReset"]),
    handleEdit(row) {
      //action=1 编辑
      this.action = 1;
      this.userVisible = true;
      const {
        _id,
        username,
        mobile,
        userEmail,
        password,
        sex,
        roleNames,
      } = row;
      this.$nextTick(()=>{
        this.userParams = {
        username,
        mobile,
        userEmail,
        password,
        roleNames,
        sex,
        _id,
      };
      })
      
    },
    //checked
    handleSelect(id) {
      let arr = [];
      id.forEach((item) => {
        arr.push(item._id);
      });
      this.ids = arr;
      console.log(this.ids);
    },
    //del
    async handleDel(row, state) {
      const _id = state ? this.ids : [row._id];
      try {
        await MessageBox.confirm("This operation will delete user information, do you want to continue?", "提示", {
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
          type: "warning",
        });
        const { errorCode } = await this.$http.dellist({ _id });
        if (errorCode == "0000") {
          this.$message({
            type: "success",
            message: "Successfully deleted",
          });
          this.handleQuery();
        }
      } catch (err) {
        console.log(err);
      }
    },
    async batchDelete() {
      this.handleDel(this.ids, 1);
    },
    //获取角色列表
    async queryRoleList() {
      const { errorCode, data } = await this.$http.roleList(this.roleForm);
      if (errorCode === "0000") {
        this.roleList = data.rolelist;
      }
    },
  },
  async created() {
    this.handleQuery();
    this.queryRoleList();
  },
};
</script>
<style lang="less" src="../less/user.less"></style>
