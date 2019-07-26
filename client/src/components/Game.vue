<template>
    <div>
        <v-container>
            <v-layout row wrap>
                <v-flex xs12>
                    <div>
                    <Question :input="activeQuestion" class="mb-2" v-if="activeQuestion"></Question>
                    </div>
                    <div class="text-center">
                        <v-btn class="green" v-show="!started" @click="StartGame">Start</v-btn>
                        <v-btn class="green" v-show="reset" @click="resetGame">Reset</v-btn>
                    </div>
                </v-flex>
                <v-flex xs6 style="border-right: 4px solid black">
                    <v-card style="height: 710px; width: 100%;" >
                        <v-layout align-end justify-center fill-height >
                            <v-flex>
                                
                                <!-- <v-layout>
                                    
                                </v-layout> -->
                                <div class="text-center">
                                    
                                    <v-icon style="font-size: 50px;" v-for="player in yes" :key="player.name">fas fa-user-tie</v-icon>
                                </div>
                                <!-- <img src="../assets/playerRun.gif" alt="playerRun" style="height: 100px; width: 100px">
                                <img src="../assets/playerRun2.gif" alt="playerRun2" style="height: 100px; width: 100px"> -->
                                <!-- <h1>Disini letak player</h1> -->

                                <v-divider></v-divider>
                                <v-card-actions>
                                    <v-btn @click="trueInput" style="margin-left: 44%; height: 80px; width: 80px;" fab color="green"><v-icon dark style="font-size: 40px;">done</v-icon></v-btn>
                                </v-card-actions>
                            </v-flex>
                        </v-layout>

                        

                    </v-card>
                </v-flex>

                <v-flex xs6 >
                    <v-card style="height: 710px; width: 100%;" >
                        <v-layout align-end fill-height >
                            <v-flex>
                                <div class="text-center">
                                    <v-icon style="font-size: 50px;" v-for="player in no" :key="player.name">fas fa-user-tie</v-icon>
                                </div>


                                <v-divider></v-divider>
                                <v-card-actions>
                                    <v-btn @click="falseInput" style="margin-left: 44%; height: 80px; width: 80px;" fab color="red"><v-icon dark style="font-size: 40px;">close</v-icon></v-btn>
                                </v-card-actions>
                            </v-flex>
                        </v-layout>

                    </v-card>
                </v-flex>

                
                <v-flex xs12 class="ml-3" v-show="lose.length > 0">
                    <h2>Dead</h2>
                    <v-icon style="font-size: 50px;" v-for="player in lose" :key="player.name">fas fa-user-tie</v-icon>
                </v-flex>

            </v-layout>
        </v-container>
    </div>
</template>

<script>
import Question from './Question'
import db from '../apis/firebase'
import { mapState } from "vuex";

export default {
    components: {
        Question
    },
    name: "Game",
    data() {
        return {
            yes: [],
            no: [],
            lose: [],
            win: "",
            questions: [],
            currentQuestion: 0,
            started: false,
            reset: false,
            activeQuestion: ""
        }
    },
    methods: {
        falseInput(){
            console.log('button false clicked')
            var index = this.currentRoomDetails.players.findIndex(player => player.name === this.user.username)
            if(index !== -1 && this.currentRoomDetails.players[index].status !== 'lose') {
                this.currentRoomDetails.players[index].status = "no"
            }
            db.collection("rooms").doc(this.$route.params.name).update({
                players: this.currentRoomDetails.players
            })
            .then(() =>{

            })
            .catch(err =>{
                console.log(err)
            })
        },
        trueInput(){
            console.log('button true clicked')
            var index = this.currentRoomDetails.players.findIndex(player => player.name === this.user.username)
            if(index !== -1 && this.currentRoomDetails.players[index].status !== 'lose') {
                this.currentRoomDetails.players[index].status = "yes"
            }
            db.collection("rooms").doc(this.$route.params.name).update({
                players: this.currentRoomDetails.players
            })
            .then(() =>{

            })
            .catch(err =>{
                console.log(err)
            })
        },
        StartGame() {
            if(this.user.username === this.currentRoomDetails.roomMaster){
                console.log(this.questions[this.currentQuestion].id, "BEFORE INTERVAL")
                this.started = true
                var interval = setInterval(() =>{
                    console.log(this.questions[this.currentQuestion].id)
                    db.collection('question').doc(this.questions[this.currentQuestion].id).update({
                        active: false        
                    })
                    this.currentQuestion++
                    if(this.currentQuestion === this.questions.length) {
                        console.log('masuk clear interval')
                        this.reset = true
                        clearInterval(interval)
                    } else {
                        console.log(this.questions[this.currentQuestion].question,'============',this.questions[this.currentQuestion].answer)
                        // this.questions[this.currentQuestion].active = true
                        db.collection('question').doc(this.questions[this.currentQuestion].id).update({
                            active: true
                        })
                        console.log(this.currentQuestion, "AFTER INTERVAL")
                        if(this.questions[this.currentQuestion].answer) { //true
                            this.currentRoomDetails.players.forEach(player =>{
                                if(player.status === "no") {
                                    player.status = "lose"
                                } 
                            })
                            db.collection("rooms").doc(this.$route.params.name).update({
                                players: this.currentRoomDetails.players
                            })
                            .then(() =>{
    
                            })
                            .catch(err =>{
                                console.log(err)
                            })
                        } else { //false
                            this.currentRoomDetails.players.forEach(player =>{
                                if(player.status === "yes") {
                                    player.status = "lose"
                                } 
                            })
                            db.collection("rooms").doc(this.$route.params.name).update({
                                players: this.currentRoomDetails.players
                            })
                            .then(() =>{
    
                            })
                            .catch(err =>{
                                console.log(err)
                            })
                        }
                    }
                }, 1000);
            }
        },
        timeOut() {
            setTimeout(() =>{
                console.log(this.currentQuestion)
                this.currentQuestion ++
            }, 2000)
        },
        resetGame() {
            this.started = false
            this.reset = false
            this.currentQuestion = 0
            this.currentRoomDetails.players.forEach(player =>{
                player.status = "yes"
            })
            db.collection("rooms").doc(this.$route.params.name).update({
                players: this.currentRoomDetails.players
            })
            .then(() =>{

            })
            .catch(err =>{
                console.log(err)
            })
        }
    },
    created (){
        this.currentQuestion = 0
        this.activeQuestion = ""

        this.$store.commit("GET_ROOM_DETAILS", this.$route.params.name)
        let query = db.collection('question');

        var yes = []
        var no = []
        this.currentRoomDetails.players.forEach(player =>{
            // console.log(player.status, "WATCHED")
            if(player.status === "yes") {
                yes.push(player)
            } else if(player.status === "no") {
                no.push(player)
            }
        })
        this.yes = yes
        this.no = no


        let observer = query.onSnapshot(querySnapshot => {

        // console.log(`Received query snapshot of size ${querySnapshot.size}`);

        var tempQuestions = []
        querySnapshot.forEach((doc)=>{
            tempQuestions.push({id: doc.id, ...doc.data()})
        });
        this.questions = tempQuestions

        


        tempQuestions.forEach(question =>{
            if(question.active) {
                this.activeQuestion = question
            }
        })
        

        }, err => {
        console.log(`Encountered error: ${err}`);
        });   
    },
    computed: mapState(['currentRoomDetails', 'user']),
    watch: {
        currentRoomDetails: function(val) {
            console.log(val)
            var yes = []
            var no = []
            var lose = []
            val.players.forEach(player =>{
                // console.log(player.status, "WATCHED")
                if(player.status === "yes") {
                    yes.push(player)
                } else if(player.status === "no"){
                    no.push(player)
                } else if(player.status === "lose") {
                    lose.push(player)
                }
            })
            this.yes = yes
            this.no = no
            this.lose = lose
        }
    }
}
</script>

<style>

</style>
