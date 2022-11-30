<script setup>
import { ref } from 'vue'

//defineProps({
  //msg: String
//})


</script>

<template>
    <v-app-bar app>
        ooさん 管理  
        <v-btn color="primary" elevation="2" large @click="goToManagement()">社員管理</v-btn>
        <v-btn color="primary" elevation="2" large @click="goToData()">監視データ</v-btn>
        <router-link to="./login">ログアウト</router-link>

    </v-app-bar>


    <div id="box">


        <div class="add">
            <v-card width="400px" >
                <v-card-title>
                    <h1 class="display-1">ooさん Welcome</h1>
                   

                </v-card-title>
                <v-card-text>
                </v-card-text>
            </v-card>
        </div>
    </div>


</template>
<script>

export default {

    methods: {
        goToManagement() {
            this.$router.push('/management')
        },
        goToData(){
            this.$router.push('/data')
        }
        

        }
    }

</script>


<style scoped>
.read-the-docs {
    color: #888;
}
button {
  height: 48px;
  background-color: white;
  color: blue;
  border: solid 1px blue;
  border-radius: 2px;
  padding: 0 24px;
  cursor: pointer;
}
 

.add {
    width: 400px;
    padding: 10px 50px;
    margin: 10px auto;
   
    border-radius: 5px;
}

h2 {
    text-align: center;
}
</style>
