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

        <v-text-field label="メールアドレス" :rules="mailrules"></v-text-field>
        <v-text-field label="名前" :rules="namerules"></v-text-field>
        <v-text-field label="フリガナ" :rules="kanarules"></v-text-field>
        <v-text-field label="携帯電話" :rules="telrules"></v-text-field>

        <v-text-field label="郵便　'-'なし入力してください" :rules="postrules"></v-text-field>
        <v-text-field label="住所" :rules="addrules"></v-text-field>
        生年月日：
        <v-container fluid>
          <v-row>
            <v-col class="d-flex" cols="6" sm="3">
              <v-select :items="year" label="年"></v-select>
            </v-col>

            <v-col class="d-flex" cols="6" sm="3">
              <v-select :items="month" label="月"></v-select>
            </v-col>
            <v-col class="d-flex" cols="6" sm="3">
              <v-select :items="day" label="日"></v-select>
            </v-col>
          </v-row>
        </v-container>
        部署:
        <v-container fluid>
          <v-row>
            <v-col class="d-flex" cols="6" sm="4">
              <v-select :items="departments" label="部署"></v-select>
            </v-col>

          </v-row>
        </v-container>

        職役:
        <v-container fluid>
          <v-row>
            <v-col class="d-flex" cols="6" sm="4">
              <v-select :items="office" label="職役"></v-select>
            </v-col>

          </v-row>
        </v-container>

        性別：
        <v-radio-group v-model="row" row>
          <v-radio label="男" value="man"></v-radio>
          <v-radio label="女" value="woman"></v-radio>
        </v-radio-group>
        入社日：
        <v-container fluid>
          <v-row>
            <v-col class="d-flex" cols="6" sm="3">
              <v-select :items="year" label="年"></v-select>
            </v-col>

            <v-col class="d-flex" cols="6" sm="3">
              <v-select :items="month" label="月"></v-select>
            </v-col>
            <v-col class="d-flex" cols="6" sm="3">
              <v-select :items="day" label="日"></v-select>
            </v-col>
          </v-row>
        </v-container>

      </v-card-text>
      <v-divider></v-divider>

      <v-snackbar v-model="hasSaved" :timeout="2000" absolute bottom left>
        Your profile has been updated
      </v-snackbar>
    </v-card>
    <v-btn color="primary" elevation="2" large @click="goToNewlogin1()">次へ</v-btn>




  </v-content>

</template>

<script>
import { includeBooleanAttr } from '@vue/shared';

export default {

  data: () => ({
    return: {
      column: null,
      row: null,
    },
    year: ['1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000',],
    month: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
    day: ['1',],
    departments: ['情報一課', '情報二課', '営業課', '管理課'],
    office: ['社員', 'リーダー', '管理'],
    mailrules: [
      value => !!value || '必要項目',
      value => (!!value.includes("@")) || 'メールアドレスは正しくありません',
    ],
    namerules: [
      value => !!value || '必要項目',
    ],
    kanarules: [
      value => !!value || '必要項目',
    ],
    telrules: [
      value => !!value || '必要項目',
      value => (value && value.length !== 11) && '電話番号は正しくありません',

    ],
    postrules: [
      value => !!value || '必要項目',
      value => (value && value.includes("-")) && 'ハーフなし入力してください',
      value => (value && value.length !== 7) && '郵便番号は正しくありません',
    ],
    addrules: [
      value => !!value || '必要項目',
    ]
  }),
  methods:{
  goToNewlogin1() {
    this.$router.push('/newlogin1')

  },
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
