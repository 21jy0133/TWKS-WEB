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


        <v-card class="overflow-hidden">
            <v-toolbar flat>
                <v-toolbar-title align="right">
                    新入社員登録
                </v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>

            <v-card-text>



            </v-card-text>

            <v-container id="input-usage" fluid>
                <v-row>
                    <v-col cols="12">
                        <v-input :messages="['21jy0133@jec.ac.jp']">
                            メールアドレス
                        </v-input>
                    </v-col>
                    <v-col cols="12">
                        <v-input :messages="['鮑雪瑶']">
                            名前
                        </v-input>
                    </v-col>
                    <v-col cols="12">
                        <v-input :messages="['ホウセツヨウ']">
                            フリガナ
                        </v-input>
                    </v-col>
                    <v-col cols="12">
                        <v-input :messages="['08040691224']">
                            携帯電話
                        </v-input>
                    </v-col>
                    <v-col cols="12">
                        <v-input :messages="['1234567']">
                            郵便
                        </v-input>
                    </v-col>
                    <v-col cols="12">
                        <v-input :messages="['東京都新宿区1-1-1']">
                            住所
                        </v-input>
                    </v-col>
                    <v-col cols="12">
                        <v-input :messages="['1990年1月1日']">
                            生年月日
                        </v-input>
                    </v-col>
                    <v-col cols="12">
                        <v-input :messages="['情報一課']">
                            部署
                        </v-input>
                    </v-col>
                    <v-col cols="12">
                        <v-input :messages="['社員']">
                            役職
                        </v-input>
                    </v-col>
                    <v-col cols="12">
                        <v-input :messages="['女']">
                            性別
                        </v-input>
                    </v-col>
                    <v-col cols="12">
                        <v-input :messages="['2023年4月1日']">
                            入社日
                        </v-input>
                    </v-col>
                </v-row>
                <v-btn color="primary" elevation="2" large @click="goToNewlogin()">戻る</v-btn>
               
                <v-dialog v-model="dialog" persistent>
                    
                <template v-slot:activator="{ props }">
                        <v-btn color="pink" v-bind="props">
                           保存
                        </v-btn>
                    </template>
                    <v-card max-width="400">
                    
                        
                        <v-card-text>保存しますか</v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="green-darken-1" variant="text" @click="dialog = false"  v-bind="props">
                                いいえ
                            </v-btn>
                            <v-btn color="green-darken-1" variant="text" @click="dialog = false,goToNewlogin2()">
                                はい
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-container>
        </v-card>

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


    methods: {
        goToNewlogin() {
            this.$router.push('/newlogin')

        },
        goToNewlogin2() {
            this.$router.push('/newlogin2')
        }

    }


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
  