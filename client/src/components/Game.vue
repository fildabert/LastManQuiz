<template>
    <div>
        <v-container>
            <v-layout row wrap>
                <v-flex xs12>
                    <div v-show="started">
                    <Question v-for="(question, index) in questions" :key="question.id" :input="question" v-show="currentQuestion === index" class="mb-2"></Question>
                    </div>
                    <div class="text-center" v-show="!started">
                        <v-btn class="green" @click="StartGame">Start</v-btn>
                    </div>
                </v-flex>
                <v-flex xs6 style="border-right: 4px solid black">
                    <v-card style="height: 710px; width: 100%;" >
                        <v-layout align-end justify-center fill-height >
                            <v-flex>
                                
                                <!-- <v-layout>
                                    
                                </v-layout> -->
                                <div class="text-center">
                                    <v-icon style="font-size: 50px;">fas fa-user-tie</v-icon>
                                </div>
                                <img src="../assets/playerRun.gif" alt="playerRun" style="height: 100px; width: 100px">
                                <img src="../assets/playerRun2.gif" alt="playerRun2" style="height: 100px; width: 100px">
                                <h1>Disini letak player</h1>

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
                                    <v-icon style="font-size: 50px;">fas fa-user-tie</v-icon>
                                </div>


                                <v-divider></v-divider>
                                <v-card-actions>
                                    <v-btn @click="falseInput" style="margin-left: 44%; height: 80px; width: 80px;" fab color="red"><v-icon dark style="font-size: 40px;">close</v-icon></v-btn>
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
import Question from './Question'
import db from '../apis/firebase'

export default {
    components: {
        Question
    },
    name: "Game",
    data() {
        return {
            yes: [],
            no: [],
            questions: [],
            currentQuestion: 0,
            started: false
        }
    },
    methods: {
        falseInput(){
            console.log('button false clicked')
            
        },
        trueInput(){
            console.log('button true clicked')
        },
        StartGame() {
            this.started = true
            var interval = setInterval(() =>{
                this.currentQuestion++
                if(this.currentQuestion === this.questions.length) {
                    console.log('masuk clear interval')
                    clearInterval(interval)
                } else {
                    console.log(this.questions[this.currentQuestion].question,'============',this.questions[this.currentQuestion].answer)
                }
            }, 1000);
        },
        timeOut() {
            setTimeout(() =>{
                console.log(this.currentQuestion)
                this.currentQuestion ++
            }, 2000)
        }
    },
    created (){
        let query = db.collection('question');

        let observer = query.onSnapshot(querySnapshot => {

        console.log(`Received query snapshot of size ${querySnapshot.size}`);
        querySnapshot.forEach((doc)=>{
            // console.log(doc.data())
            this.questions.push({id: doc.id, ...doc.data()})
        });
            console.log(this.questions)

        }, err => {
        console.log(`Encountered error: ${err}`);
        });
        
    }
}
</script>

<style>

</style>
