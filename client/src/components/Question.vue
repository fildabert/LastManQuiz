<template>
  <div>
      <v-card>
        <v-card-title>{{input.question}}</v-card-title>
        <v-card-text>I'm card text</v-card-text>
        <v-card-actions>
          <v-btn text>Click</v-btn>
        </v-card-actions>
      </v-card>
  </div>
</template>

<script>
export default {
  props: ["input"],
  data(){
    return {
      
    }
  }
}
</script>

<style>

</style>
