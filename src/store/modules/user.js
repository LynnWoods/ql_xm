
import { ComTools } from '@/utils/tools.js'

export default {
    // namespaced: true,
    state: {
        userInfo: {},
    },
    mutations: {
       setUserInfo(state,info){
           state.userInfo.mobile = info.tel
           state.userInfo.invite = info.invitationCode
		   state.userInfo.jyPasswprd = info.jyPasswprd
       }
    },
    actions: {
        getUserInfo({state,commit},step){
            commit('setUserInfo',step)
        }
    }
}
