<script setup>
import { ref } from 'vue'

//defineProps({
  //msg: String
//})


</script>

<template>

    <div id="box">
        <div class="add">
            <v-card width="400px">
            </v-card>
        </div>
    </div>
    <v-content>
        <v-layout wrap>
            <v-btn block color="primary" x-large elevation="21" @click="goToManagement()">社員管理</v-btn>
            <v-btn class="ml-4" block color="primary" x-large elevation="21" @click="goToData()">監視データ</v-btn>

        </v-layout>
    </v-content>


</template>


<script>


export default {

    meta: { requiresAuth: true },

    methods: {
        goToManagement() {
            this.$router.push('/management')
        },
        goToData() {
            this.$router.push('/data')
        },


    }
}

</script>


<style scoped>
.read-the-docs {
    color: #888;
}

button {

    font-size: 1.6rem;
    font-weight: 700;
    line-height: 1.5;
    height: 48px;
    min-width: 40%;
    min-height: 40%;
    background-color: white;
    color: blue;
    border: solid 1px blue;
    border-radius: 2px;
    padding: 0 24px;
    cursor: pointer;
    border-radius: 0.5rem;

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
