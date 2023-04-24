import { createStore } from 'vuex'
import { postModule } from "@/store/postModule";

export default createStore({
  // state: {
  //   likes: 5
  // },
  // getters: {
  //   doubleLikes(state){
  //     return state.likes * 2
  //   }
  // },
  // mutations: {
  //   iLikes(state){
  //     return state.likes += 1
  //   },
  //   dLikes(state){
  //     return state.likes -= 1
  //   }
  // },
  // actions: {
  // },
  modules: {
    posts: postModule
  }
})
