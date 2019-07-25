<template>
    <div>
        <v-container>
            <v-layout>
                <v-flex xs6 style="border-right: 4px solid black">
                    <v-card style="height: 870px; width: 100%;" >
                        <v-layout align-end justify-center fill-height >
                            <v-flex>
                                <!-- <v-layout>
                                    
                                </v-layout> -->
                                <div class="text-center"><v-icon>fas fa-user-tie</v-icon></div>



                                <v-divider></v-divider>
                                <v-card-actions>
                                    <v-btn style="margin-left: 44%; height: 80px; width: 80px;" fab color="green"><v-icon dark style="font-size: 40px;">done</v-icon></v-btn>
                                </v-card-actions>
                            </v-flex>
                        </v-layout>

                        

                    </v-card>
                </v-flex>

                <v-flex xs6 >
                    <v-card style="height: 870px; width: 100%;" >
                        <v-layout align-end fill-height >
                            <v-flex>
                                <h1 class="text-center">asd</h1>
                                <v-divider></v-divider>
                                <v-card-actions>
                                    <v-btn style="margin-left: 44%; height: 80px; width: 80px;" fab color="red"><v-icon dark style="font-size: 40px;">close</v-icon></v-btn>
                                </v-card-actions>
                            </v-flex>
                        </v-layout>

                    </v-card>
                </v-flex>

                
            </v-layout>
        </v-container>
    </div>
</template>

<script>
export default {
    name: "Game",
    data() {
        return {
            yes: [],
            no: []
        }
    }
}
</script>

<style>

</style>
