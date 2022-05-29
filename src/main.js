import Vue from 'vue'
import App from './App.vue'
import {Message} from 'element-ui';
import router from './router'
Vue.config.productionTip = false
import store from '@/store'
import $http from '@/http'

Vue.use($http);
// 表单提交
Vue.prototype.$_submit = (formDom, callback) => {
  formDom.validate((valid) => {
    if (valid) {
      callback();
    } else {
      let errors = formDom.fields;
      for (let error of errors) {
        if (error.validateState === 'error') {
          Message.warning({
            message: error.validateMessage
            , duration: 2000
          });
          break;
        }
      }
    }
  });
};
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
