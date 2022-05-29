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
            * @params {Number} menu Whether to get the button list 0: get 1: not get
            */
            const { errorCode, data } = await $http.menuList({menuType});
            if (errorCode != "0000") {
                return false;
            }  

            if(menuType==1){
            //Set up sidebar menu
            commit('setNavTree',data)
            }
            return data
        }
    }
}