<template>
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >


      <v-list dense>
        <!-- <v-list-item v-for="(item, i) in items" :key="i" :to="{path: item.link}">
          <v-list-item-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{item.name}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->

        <v-list-item>
            <v-list-item-content>
                <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn text dark v-on="on">Create Room</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Create Room</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Room Name" required v-model="inputRoom"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="createRoom">Create</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
            </v-list-item-content>
        </v-list-item>

        <v-divider light></v-divider>


        <v-list-item v-for="(room, i) in $store.state.rooms" :key="room.id" :to="{path: `/room/${room.id}`}">
          <v-list-item-action>
            <v-icon>home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{room.name}}</v-list-item-title>
            <v-list-item-title>
                <v-icon small>person</v-icon>
                <span>{{room.players.length}}</span>
            </v-list-item-title>
            
          </v-list-item-content>
          <v-spacer></v-spacer>

            <v-btn icon v-if="$store.state.currentRoom === room.id" @click="leaveRoom(room)"><v-icon small>fas fa-sign-out-alt</v-icon></v-btn>
            <v-btn v-if="!$store.state.joined" text style="font-size: 12px;"> join</v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
import db from "../apis/firebase"
import { mapState } from "vuex";


export default {
    props: ['openDrawer'],
    created() {
    },
    data() {
        return {
            drawer: null,
            dialog: false,
            inputRoom: "",
       
        color: 'primary',
        }
    },
    methods: {
        createRoom: function() {
          if(this.user.username){
            db.collection("rooms").doc().set({
                name: this.inputRoom,
                players: [{
                    name: this.$store.state.user.username,
                    status: true
                }],
                roomMaster: this.$store.state.user.username
            })
          }
        },
        joinRoom: function(room) {

        },
        leaveRoom: function(room) {
            if(room.players.length <= 1 || this.$store.state.user.username === room.roomMaster) {
                return db.collection("rooms").doc(room.id).delete()
                .then(() =>{
                    console.log("You have left the room")
                })
                .catch(err =>{
                    console.log(err)
                })
            } else {
                var updatedPlayers = room.players
                var found = room.players.findIndex(player => player.name === this.$store.state.user.username)
                updatedPlayers.splice(found, 1)
                return db.collectioin("rooms").doc(room.id).update({
                    players: updatedPlayers
                })
                .then(() =>{
                    console.log("You have left the room")
                })
                .catch(err =>{
                    console.log(err)
                })
            }
        }
    },
    watch: {
        openDrawer: function(val) {
            this.drawer = val
        }
    },
    computed: mapState(['user'])
}
</script>

<style>

</style>
