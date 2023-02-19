<template>
    <v-app-bar app>
      ooさん 管理
      <v-btn color="primary" elevation="2" large @click="goToManagement()">社員管理</v-btn>
      <v-btn color="primary" elevation="2" large @click="goToData()">監視データ</v-btn>
      <router-link to="/login">ログアウト</router-link>
    </v-app-bar>
    <v-navigation-drawer>
  
    </v-navigation-drawer>
  
    <v-content>
  
  
      <v-card class="overflow-hidden">
        <v-toolbar flat>
          <v-toolbar-title align="right">
            情報更新
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
  
  
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>

            メールアドレス：
            <v-text-field v-model="mail" label="21jy0133@jec.ac.jp"   disabled></v-text-field>
            名前：
            <v-text-field v-model="name" label="鲍雪瑶" disabled></v-text-field>
            フリガナ：
            <v-text-field v-model="kana" label="ホウセツヨウ" disabled></v-text-field>
            電話番号：
            <v-text-field v-model="tel" label="電話番号" :rules="telrules" :counter="11" required></v-text-field>
            郵便番号：
            <v-text-field v-model="post" label="郵便　'-'なし入力してください" :rules="postrules" :counter="7" required></v-text-field>
            住所：
            <v-text-field v-model="address" label="住所" :rules="addrules" :counter="100" required></v-text-field>
            生年月日：
            <v-text-field v-model="mail" label="1990年1月1日"  disabled></v-text-field>           
            部署:
            <v-container fluid>
              <v-row>
                <v-col class="d-flex" cols="6" sm="4">
                  <v-select :items="departments" label="部署" :rules="[v => !!v ||  '必要項目']"></v-select>
                </v-col>
  
              </v-row>
            </v-container>
            職役:
            <v-container fluid>
              <v-row>
                <v-col class="d-flex" cols="6" sm="4">
                  <v-select :items="office" label="役職" :rules="[v => !!v ||  '必要項目']"></v-select>
                </v-col>
  
              </v-row>
            </v-container>
            性別：
            <v-text-field v-model="mail" label="女"  disabled></v-text-field>
            入社日：
            <v-text-field v-model="mail" label="2023年4月1日"  disabled></v-text-field>
          </v-form>
        
        </v-card-text>
     
  
  
  
      </v-card>
      <v-btn color="primary" elevation="2" large @click="goToManagement()">戻る</v-btn>
      <v-btn color="primary" elevation="2" :disabled="invalid" type="submit" large @click="validate()">次へ</v-btn>

    </v-content>
  
  </template>
  
  <script>
  import { includeBooleanAttr } from '@vue/shared';
  
  export default {
  
    data: () => ({
      valid: true,
  
      //return: {
      //  column: null,
      //  row: null,
      //},
      year: ['1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000',],
      month: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
      day: ['1',],
      departments: ['情報一課', '情報二課', '営業課', '管理課'],
      office: ['社員', 'リーダー', '管理'],
     
      
      tel: "",
      telrules: [
        value => !!value || '必要項目',
        value => (value && value.length !== 11) && '電話番号は正しくありません',
        value => (/^\d+$/.test(value)) || '数字を入力してください',
  
      ],
      post: "",
      postrules: [
        value => !!value || '必要項目',
        value => (value && value.includes("-")) && 'ハーフなし入力してください',
        value => (value && value.length !== 7) && '郵便番号は正しくありません',
        value => (/^\d+$/.test(value)) || '数字を入力してください',
  
      ],
      address: "",
      addrules: [
        value => !!value || '必要項目',
      ]
    }),
    methods: {
        goToNewlogin4() {
        this.$router.push('/newlogin4')
      },
      goToManagement() {
        this.$router.push('/management')
      },
      async validate() {
        const { valid } = await this.$refs.form.validate()
        if (valid) {
          goToNewlogin4()
        } else { 
          
        }
      },
  
  
  
      save() {
        //this.loading.save = true;
        //this.$refs["form"].validate((volid) => {
        // if (!valid) {
        //   this.$notify.error({
        //     title: "error",
        //    message: "error message",
        //  })
        // }
        // });
        //  this.loading.save = false;
        // this.return;
        //goToNewlogin1();
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
  