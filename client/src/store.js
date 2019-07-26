import Vue from 'vue'
import Vuex from 'vuex'
import db from "./apis/firebase"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rooms: [],
    user: {
      username: ""
    },
    joined: false,
    currentRoom: "",
    isLogin:false
  },
  mutations: {
    SET_ROOM: function(state, payload) {
      state.rooms = payload
    },
    LOGIN: function(state, payload){
      state.user.username = payload
      state.isLogin = true

    },
    LOGOUT: function(state){
      state.user.username = ""
      state.isLogin = false

    },
    SET_USER: function(state, payload) {
      state.user = payload
    },
    SET_USER_JOINED: function(state, payload) {
      state.joined = payload
    },
    SET_CURRENT_ROOM: function(state, payload) {
      state.currentRoom = payload
    }
  },
  actions: {
    GET_ROOMS: function(context) {
      console.log('MASUK')
      db.collection("rooms").onSnapshot(querySnapshot =>{
        var roomList = []
        querySnapshot.forEach(doc =>{
          roomList.push({
            id: doc.id,
            ...doc.data()
          })
        })

        context.commit("SET_ROOM", roomList)
        roomList.forEach(room =>{
          var includes = room.players.includes(context.state.user.username)
          if(includes) {
            context.commit("SET_USER_JOINED", true)
            context.commit("SET_CURRENT_ROOM", room.id)
          }
        })
      })
    },
    SET_ROOM: function(context) {

    }
  }
})
