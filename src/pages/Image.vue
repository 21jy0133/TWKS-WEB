<template>
    <v-app-bar app>
        ooさん 管理
        <v-btn color="primary" elevation="2" large @click="goToManagement()">社員管理</v-btn>
        <v-btn color="primary" elevation="2" large @click="goToData()">監視データ</v-btn>
        <router-link to="/login">ログアウト</router-link>   

    </v-app-bar>

    <v-content>
        <h1 text-align="center">スクリーンショット</h1>
        <v-btn color="primary" elevation="2" @click="goToManagement()" large>戻る</v-btn>
        <v-navigation-drawer>
            <div>
                <Datepicker v-model="pickedDate"></Datepicker>         
                選択日付: {{ pickedDate }}
                

            </div>
        <v-btn color="primary" elevation="2" >検索</v-btn>   
        </v-navigation-drawer>

    </v-content>


    <div>
        <!-- directive -->
        <div class="images" v-viewer>
            <v-row>

                <v-col style="text-align: center; padding-top: 100px;" @click="last" cols="3" sm="1">
                    <p v-show="startIndex > 0"> 前</p>
                </v-col>
                <v-col cols="2" v-show="startIndex <= imageIndex && imageIndex <= startIndex + 4"
                    v-for="imageIndex in Array.from({ length: 30}, (v, i) => i)">
                    <img :src="imageUrl + '=' + imageIndex">
                </v-col>

                <v-col style="text-align: center; padding-top: 100px;" @click="next" cols="3" sm="1">
                    次
                </v-col>
            </v-row>
        </div>
</div>
</template>


<script>
import { time } from 'echarts';
import Viewer from 'viewerjs'
//import { defineComponent } from 'vue'
import VueTimePicker from "vue3-timepicker";
import "vue3-timepicker/dist/VueTimepicker.css";





export default {
    name: "App",

    data() {

        return {
            dialog: false,
            selectedDepartment: null,
            selectOffice: null,
            index: 0,
            list: [],
            data: [],
            startIndex: 0,
            maxIndex: 100,
            model: null,
            imageUrl: "https://picsum.photos/200/200?image",
        };
    },
   
    methods: {
        goToData() {
            this.$router.push("/data");
        },
        goToManagement() {
            this.$router.push("/management");
        },
        gotoDelete() {
            this.$router.push("/deleted");
        },
        last() {
            if (this.startIndex == 0)
                return
            this.startIndex = (this.startIndex - 1) % this.maxIndex;
        },
        next() {
            this.startIndex = (this.startIndex + 1) % this.maxIndex;
        }
    },

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

.table {
    height: 80%;
    width: 80%;
    font-weight: 1000;
    border-collapse: collapse;
    margin-left: auto;
    margin-right: auto;
    text-align: center
}

tr:nth-child(odd) {
    background-color: #ddd;
    /* 背景色指定 */
}

th,
td {
    padding: 5px 10px;
    /* 余白指定 */
}


.time-preview {
    border: 1px solid #eee;
    max-width: 400px;
    text-align: center;
    margin: 0 auto;
    margin-bottom: 20px;
    padding: 15px;
    background: rgb(70, 25, 173);
    color: #fff;
}

.time-preview-time {
    font-size: 30px;
}
</style>
