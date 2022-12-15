<template>
    <v-app-bar app>
        ooさん 管理
        <v-btn color="primary" elevation="2" large>社員管理</v-btn>
        <v-btn color="primary" elevation="2" large @click="goToData()">監視データ</v-btn>
        <router-link to="/login">ログアウト</router-link>
    </v-app-bar>
    <v-navigation-drawer>

    </v-navigation-drawer>

    <v-content>
        <h1 align="center">ご登録ありがとうございます。
        PW配布メールを送りました。</h1>
       

    </v-content>

</template>
  
<script>
import { includeBooleanAttr } from '@vue/shared';

export default {
    data() {
        return {
            dialog: false,
        }
    },


   


}



</script>
<style scoped>
#container {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    border-radius: 20px;
    margin-top: 10px;
    color: black;
}

#bg {
    width: 100%;
    height: 100%;
    background: url("../assets/bg2.jpg");
    background-size: 100% 100%;
    position: fixed;
    top: 0;
    left: 0;
}

p {
    font-size: 20px;
    margin-top: 20px;
    text-align: left;
    margin-left: 32%;

}

button {
    position: relative;
    height: 33px;
    width: 150px;
    background: rgba(35, 19, 252, 0.425);
    border-radius: 10px;
    margin-top: 10px;
    box-shadow: none;
    color: white;
    margin-left: 10px;

}

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

.overflow-hidden {
    width: 60%;
}
</style>
  