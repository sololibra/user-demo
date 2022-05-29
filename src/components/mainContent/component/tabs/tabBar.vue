<template>
  <div class="k-kt6p6u">
    <el-tabs
      v-model="bars.tabsValue"
      type="card"
      closable
      @tab-click="handleTabsClick"
      @tab-remove="removeTab"
    >
      <el-tab-pane
        :key="item.name"
        v-for="item in bars.tabsList"
        :label="item.title"
        :name="item.name"
      >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { Tabs, TabPane } from "element-ui";
import Vue from "vue";
Vue.use(Tabs);
Vue.use(TabPane);
import { mapActions, mapState, mapMutations } from "vuex";
import { setItem, getItem } from "@/utils/storage";
export default {
  data() {
    return {};
  },
  watch: {
    $route: {
      handler: function(item) {
        let sessionBar =getItem("bars");
        //If there is a tab cache and the id is 0 (representing whether the page is reset), the cached tab will be fetched, and login will be called to prevent the loss of button permissions.
        if (this.bars.id == 0 && sessionBar) {
          this.setBars(sessionBar)
          this.login()
        }

        const tabs = this.bars.tabsList;
        const isAdd = tabs.find((arg) => {
          return arg.title === item.name;
        });

        if (isAdd) {
          this.bars.tabsValue = isAdd.name;
          return;
        }
        this.addTabs(item);
        setItem("bars", this.bars);
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    ...mapState("tabs", ["bars"]),
  },
  methods: {
    ...mapMutations("tabs", ["setBars"]),
    ...mapActions("tabs", [
      "handleTabsEdit",
      "addTabs",
      "handleTabsClick",
      "removeTab",
    ]),
    ...mapActions('permSign',['login'])
  },
};
</script>
<style src="./index.less" lang="less"></style>
