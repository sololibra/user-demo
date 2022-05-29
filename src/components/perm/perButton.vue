<template>
    <el-button size="mini" :type="type" :disabled="isPerm" @click="handleClick">
      <slot />
    </el-button>
</template>
<script>
import hasPerm from "@/utils/hasPermSign";
import Vue from "vue";
import { Button } from "element-ui";
Vue.use(Button);
export default {
  props: {
    perm: {
      type: String,
      default:''
    },
    type:{
      type:String,
      default:'primary'
    }
  },
  data() {
    return {
      isPerm: true,
    };
  },
  watch: {
      //When the child component props gets the value from the parent component for the first time, it needs to execute the function. At this time, you need to set immediate to true
      "perm":{
        handler:function(val){
            this.isPerm = this.hasPerm(val);
        },
        immediate:true
    }
  },
  methods: {
      handleClick: function () {
      // 按钮操作处理函数
      this.$emit('click')
    }, 
    hasPerm,
  }
};
</script>
