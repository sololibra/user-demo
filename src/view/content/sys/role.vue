<template>
  <div class="k-9sptcz">
    <el-form
      ref="roleForm"
      :inline="true"
      class="k-9sptcz-header"
      :model="roleForm"
    >
      <el-form-item label="Role Name" prop="roleName">
        <el-input placeholder="Role name" v-model="roleForm.roleName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="handleQuery">Search</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary " @click="addrole">Add Role</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleReset($refs['roleForm'])">Reset</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="roleData"
      style="width: 100%"
      ref="singleTable"
      highlight-current-row
      @current-change="handleCurrentChange"
    >
      <el-table-column prop="roleName" label="角色名称ROLE NAME"> </el-table-column>
      <el-table-column prop="remark" label="REMARK"> </el-table-column>
      <el-table-column prop="updateTime" label="UPDATE AT"> </el-table-column>
      <el-table-column label="OPERATE" fixed="right" width="150">
        <template slot-scope="scope">
          <!-- The permission ID edit when passing in the setting button -->
          <per-button size="mini" perm="edit"  @click="handleEdit(scope.row)">Edit</per-button>
          <el-button size="mini" type="danger" @click="handleDel(scope.row)"
            >Del</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="k-51q64z">MENU AUTHORIZATION</div>
    <el-tree
      :data="menuList"
      show-checkbox
      node-key="_id"
      ref="tree"
      :props="{ label: 'name' }"
    >
      <div class="k-9sptcz-content" slot-scope="{ data }">
        <span class="k-9sptcz-title">{{ data.name }}</span>
        <el-button size="mini" type="success">{{
          data.menuType == 1 ? "Menu" : "Button"
        }}</el-button>
      </div>
    </el-tree>
    <el-button
      size="small"
      class="k-731ncg-btn"
      type="success"
      @click="handlePrem"
      :disabled="checkedRow ? false : true"
      >确认授权</el-button
    >
    <el-dialog
      :title="action ? 'Edit role' : 'Add role'"
      :visible.sync="roleVisible"
    >
      <el-form
        ref="roleForm"
        :model="roleParams"
        :rules="roleRule"
        label-width="80px"
      >
        <el-form-item label="Name" prop="roleName">
          <el-input v-model="roleParams.roleName"></el-input>
        </el-form-item>
        <el-form-item label="Remark" prop="remark">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            v-model="roleParams.remark"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirm">Submit</el-button>
          <el-button @click="cancel">Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import Vue from "vue";
Vue.prototype.$ELEMENT = { size: "small", zIndex: 3000 };
import {
  Table,
  Dialog,
  TableColumn,
  Form,
  FormItem,
  Input,
  Button,
  Message,
  Tree,
} from "element-ui";
Vue.prototype.$message = Message;
//Import button permission component
import perButton from "@/components/perm/perButton"
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Button);
Vue.use(Dialog);
Vue.use(Tree);
Vue.use(Table);
Vue.use(TableColumn);
export default {
  components:{
    perButton
  },
  data() {
    return {
      action: 0,
      roleData: [],
      roleForm: {
        roleName: "",
      },
      roleParams: {},
      roleVisible: false,
      menuList: [],
      roleid: "",
      checkedRow: "",
      roleRule: {
        roleName: [
          { required: true, message: "请输入角色名", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      }
    };
  },

  methods: {
    //新增角色
    addrole() {
      this.action = 0;
      this.roleVisible = true;
    },
    handleEdit(val){
      console.log(val)
    },
    async confirm() {
      const { errorCode } = await this.$http.addRoleList({
        ...this.roleParams,
        action: this.action,
      });
      if (errorCode === "0000") {
        this.$message({
          type: "success",
          message: "操作成功",
        });
        this.handleQuery();
        this.$refs["roleForm"].resetFields();
        this.roleVisible = false;
      }
    },
    cancel() {
      this.$refs["roleForm"].resetFields();
      this.roleVisible = false;
    },
    //删除角色
    async handleDel({ _id }) {
      const { errorCode } = await this.$http.delroleList({ _id });
      if (errorCode === "0000") {
        this.$message({
          type: "success",
          message: "删除成功",
        });
        this.handleQuery();
      }
    },
    //确认授权 类型为button需传入权限标识permSign
    async handlePrem() {
      const halfKeys = this.$refs.tree.getHalfCheckedKeys();
      const checkedKeys = this.$refs.tree.getCheckedKeys();
      const checkedNodes = this.$refs.tree.getCheckedNodes();
      //菜单集合
      const permId = halfKeys.concat(checkedKeys);
      //权限标识
      let permSign = [];
      checkedNodes.forEach((item) => {
        //如果是按钮则加入标识
        if (item.menuType == 2) {
          permSign.push(item.limitCode);
        }
      });
      const { errorCode } = await this.$http.addRoleList({
        _id: this.roleid,
        permSign,
        checkedKeys,
        permId,
        action: 1,
      });
      if (errorCode === "0000") {
        this.$message({
          type: "success",
          message: "权限设置成功",
        });
        await this.handleQuery();
        for (var item in this.roleData) {
          if (this.checkedRow._id == this.roleData[item]._id) {
            this.$refs.singleTable.setCurrentRow(this.roleData[item]);
          }
        }
      }
    },
    //获取角色
    async handleQuery() {
      const { errorCode, data } = await this.$http.roleList(this.roleForm);
      if (errorCode === "0000") {
        this.roleData = data.rolelist;
      }
    },
    //选中列
    handleCurrentChange(row) {
      if (!row) return;
      this.roleid = row._id;

      this.checkedRow = row;
      this.$refs.tree.setCheckedKeys(row.checkedKeys);
      //    const { errorCode, data } = await this.$http.menuList({_ids:row.permId});
      //   if (errorCode === "0000") {
      //     this.menuList = data;
      //   }
    },
    //获取全量菜单
    async queryAllMenu() {
      /**
       * @param {number} 1代表获取全部菜单
       */
      const { errorCode, data } = await this.$http.menuList({ menuNum: 1 });
      if (errorCode === "0000") {
        this.menuList = data;
      }
    },
  },
  created() {
    this.handleQuery();
    this.queryAllMenu();
  },
};
</script>
<style lang="less" src="../less/role.less"></style>
