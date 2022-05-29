import $http from '@/http/api'
export default {
    namespaced: true,
    state: {
        navTree: '',
        collapse:false
    },
    mutations: {
        setNavTree(state, data) {
            
            state.navTree = data
        },
        setCollapse(state,data){
            state.collapse = data
        }
    },
    actions: {
       async addMenuList({commit},menuType) {
           /**
            * @params {Number} menu 是否获取按钮列表 0：获取 1：不获取
            */
            const { errorCode, data } = await $http.menuList({menuType});
            if (errorCode != "0000") {
                return false;
            }  

            if(menuType==1){
            //设置侧边栏菜单
            commit('setNavTree',data)
            }
            return data
        }
    }
}