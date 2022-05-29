<template>
  <div>
    <div class="k-j2nnc8">
      <div class="k-j2nnc8-cos" @click="setCollapse(!collapse)">
        <i :class="collapse?'el-icon-s-unfold':'el-icon-s-fold'"></i>
      </div>
      <div class="k-j2nnc8-loginout" @click="logout">Logout</div>
    </div>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import { MessageBox } from "element-ui";
import { mapMutations, mapState } from "vuex";
export default {
  computed: {
    ...mapState("navMenu", ["collapse"]),
  },
  methods: {
    ...mapMutations("navMenu", ["setCollapse"]),

    async logout() {
      try {
        await MessageBox.confirm("This operation will log out of the system, do you want to continue?", "PROMPT", {
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
          type: "warning",
        });
        Cookies.remove("token");
        // Cookies.remove("user");
        sessionStorage.clear();
        this.$router.push("/login");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<style src="./index.less" lang="less"></style>
