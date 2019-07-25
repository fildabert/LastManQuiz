<template>
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >

    
      <v-list dense>
        <v-list-item v-for="(item, i) in items" :key="i" :to="{path: item.link}">
          <v-list-item-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{item.name}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- <v-list-item @click="">
          <v-list-item-action>
            <v-icon>settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->
      </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
    props: ['openDrawer'],
    data() {
        return {
            drawer: null,
            items: [
                {name: "Home", icon: "home", link: "/"},
                {name: "Room", icon: "home", link: "/game"}
            ],
       
        color: 'primary',
        }
    },
    watch: {
        openDrawer: function(val) {
            this.drawer = val
        }
    }
}
</script>

<style>

</style>
