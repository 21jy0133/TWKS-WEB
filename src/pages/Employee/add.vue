<template>
  <v-content>


    <v-container v-if="!confirmMode">

      <v-card class="overflow-hidden">

        <v-toolbar flat>
          <v-toolbar-title>
            新入社員登録
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>


        <v-card-text>
          <v-form ref="form" v-model="isValid">

            <v-text-field v-model="employeeData.email" label="メールアドレス" :rules="mailrules" :counter="50"
              required></v-text-field>
            <v-text-field v-model="employeeData.name" label="名前" :rules="namerules" :counter="20" required></v-text-field>
            <v-text-field v-model="employeeData.kana" label="フリガナ" :rules="kanarules" :counter="20"
              required></v-text-field>
            <v-text-field v-model="employeeData.tel" label="携帯電話" :rules="telrules" :counter="11" required></v-text-field>

            <v-text-field v-model="employeeData.postCode" label="郵便　'-'なし入力してください" :rules="postrules" :counter="7"
              required></v-text-field>
            <v-text-field v-model="employeeData.address" label="住所" :rules="addrules" :counter="100"
              required></v-text-field>
            生年月日：
            <v-container fluid :rules="[v => !!v || '必要項目']">
              <v-row>
                <v-col class="d-flex" cols="6" sm="3">
                  <v-select v-model="employeeData.birthday.year" :items="year" label="年"
                    :rules="[v => !!v || '必要項目']"></v-select>
                </v-col>

                <v-col class="d-flex" cols="6" sm="3">
                  <v-select v-model="employeeData.birthday.month" :items="month" label="月"
                    :rules="[v => !!v || '必要項目']"></v-select>
                </v-col>
                <v-col class="d-flex" cols="6" sm="3">
                  <v-select v-model="employeeData.birthday.day" :items="day" label="日"
                    :rules="[v => !!v || '必要項目']"></v-select>
                </v-col>
              </v-row>
            </v-container>
            部署:
            <v-container fluid>
              <v-row>
                <v-col class="d-flex" cols="6" sm="4">
                  <v-select v-model="employeeData.deptCode" :items="departments" label="部署" :rules="[v => !!v || '必要項目']"
                    item-value="deptCode" item-title="deptName"></v-select>
                </v-col>

              </v-row>
            </v-container>

            職役:
            <v-container fluid>
              <v-row>
                <v-col class="d-flex" cols="6" sm="4">
                  <v-select v-model="employeeData.jobTitleCode" :items="titles" label="役職" :rules="[v => !!v || '必要項目']"
                    item-value="code" item-title="name"></v-select>
                </v-col>

              </v-row>
            </v-container>

            性別：
            <v-container fluid>
              <v-row>
                <v-col class="d-flex" cols="6" sm="4">
                  <v-select v-model="employeeData.sex" :items="['男', '女']" label="性別"
                    :rules="[v => !!v || '必要項目']"></v-select>
                </v-col>
              </v-row>
            </v-container>
            入社日：
            <v-container fluid>
              <v-row>
                <v-col class="d-flex" cols="6" sm="3">
                  <v-select v-model="employeeData.initDate.year" label="年" :items="year"
                    :rules="[v => !!v || '必要項目']"></v-select>
                </v-col>

                <v-col class="d-flex" cols="6" sm="3">
                  <v-select v-model="employeeData.initDate.month" label="月" :items="month"
                    :rules="[v => !!v || '必要項目']"></v-select>
                </v-col>
                <v-col class="d-flex" cols="6" sm="3">
                  <v-select v-model="employeeData.initDate.day" label="日" :items="day"
                    :rules="[v => !!v || '必要項目']"></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>

      </v-card>
      <v-btn color="primary" elevation="2" large @click="goToManagement()">戻る</v-btn>
      <v-btn color="primary" elevation="2" large @click="validate()">次へ </v-btn>

    </v-container>


    <v-container v-else fluid>
      <v-row>
        <v-col cols="12">
          <v-input :messages="[employeeData.email]">
            メールアドレス
          </v-input>
        </v-col>
        <v-col cols="12">
          <v-input :messages="[employeeData.name]">
            名前
          </v-input>
        </v-col>
        <v-col cols="12">
          <v-input :messages="[employeeData.kana]">
            フリガナ
          </v-input>
        </v-col>
        <v-col cols="12">
          <v-input :messages="[employeeData.tel]">
            携帯電話
          </v-input>
        </v-col>
        <v-col cols="12">
          <v-input :messages="[employeeData.postCode]">
            郵便
          </v-input>
        </v-col>
        <v-col cols="12">
          <v-input :messages="[employeeData.address]">
            住所
          </v-input>
        </v-col>
        <v-col cols="12">
          <v-input
            :messages="[concatDate(employeeData.birthday.year, employeeData.birthday.month, employeeData.birthday.day)]">
            生年月日
          </v-input>
        </v-col>
        <v-col cols="12">
          部署
          <v-select v-model="employeeData.deptCode" :items="departments" disabled :rules="[v => !!v || '必要項目']"
            item-value="deptCode" item-title="deptName"></v-select>
        </v-col>
        <v-col cols="12">
          役職
          <v-select v-model="employeeData.jobTitleCode" :items="titles" disabled :rules="[v => !!v || '必要項目']"
            item-value="code" item-title="name"></v-select>
        </v-col>
        <v-col cols="12">
          <v-input :messages="[employeeData.sex]">
            性別
          </v-input>
        </v-col>
        <v-col cols="12">
          <v-input
            :messages="[concatDate(employeeData.initDate.year, employeeData.initDate.month, employeeData.initDate.day)]">
            入社日
          </v-input>
        </v-col>
      </v-row>
      <v-btn color="primary" elevation="2" large @click="confirmMode = false">戻る</v-btn>

      <v-dialog v-model="dialog" persistent width="auto">
        <template v-slot:activator="{ props }">
          <v-btn color="primary" v-bind="props">
            保存
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="text-h5">
            保存しますか？
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green-darken-1" variant="text" @click="dialog = false">
              いいえ
            </v-btn>
            <v-btn color="green-darken-1" variant="text" @click="save(); dialog = false">
              はい
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>

  </v-content>
</template>

<script>
import DepartmentService from '../../services/department.service'
import EmployeeService from '../../services/employee.service'
import JobTitleService from '../../services/jobTitle.service'

export default {

  data: () => ({
    isValid: true,
    confirmMode: false,
    dialog: false,

    //return: {
    //  column: null,
    //  row: null,
    //},
    year: ['1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000'],
    month: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
    day: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
    departments: [],
    titles: [],

    employeeData: {
      mail: "",
      sex: "",
      name: "",
      kana: "",
      tel: "",
      post: "",
      address: "",
      birthday: { year: null, month: null, day: null },
      initDate: { year: null, month: null, day: null },
    },

    mailrules: [
      value => !!value || '必要項目',
      //value => (!!value.includes("@")) || 'メールアドレスは正しくありません',
      value => /.+@.+\..+/.test(value) || 'メールアドレスは正しくありません',
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
      value => (/^\d+$/.test(value)) || '数字を入力してください',

    ],

    birthdayrules: [
      value => !!value || '必要項目',
      value => isNaN(Date.parse(concatDate(this.employeeData.birthday.year, this.employeeData.birthday.month, this.employeeData.birthday.day))) || '正しい日付入力してください',
    ],


    postrules: [
      value => !!value || '必要項目',
      value => (value && value.includes("-")) && 'ハーフなし入力してください',
      value => (value && value.length !== 7) && '郵便番号は正しくありません',
      value => (/^\d+$/.test(value)) || '数字を入力してください',

    ],

    addrules: [
      value => !!value || '必要項目',
    ]
  }),
  methods: {
    goToManagement() {
      this.$router.push('/management')
    },
    async validate() {
      const { valid } = await this.$refs.form.validate()
      if (valid) {
        this.confirmMode = true
      } else {

      }
    },
    concatDate(year, month, day) {
      const zeroPad = (num, places) => String(num).padStart(places, '0')
      return year + '-' + zeroPad(month, 2) + '-' + zeroPad(day,2)
    },



    save() {

      this.$loading.active = true

      let postData = JSON.parse(JSON.stringify(this.employeeData));

      postData.departmentDeptCode = postData.deptCode
      postData.jobTitle = postData.jobTitleCode

      postData.birthday = this.concatDate(postData.birthday.year, postData.birthday.month, postData.birthday.day)
      postData.initDate = this.concatDate(postData.initDate.year, postData.initDate.month, postData.initDate.day)

      EmployeeService.registEmployee(postData).then(res => {
        this.updated = true
        window.scrollTo(0, 0);
        this.$loading.active = false
        this.$router.push('/management')
      }).catch(error => console.log(error))
    }
  },

  mounted() {

    if (this.$store.state.user.userDetail.department.deptCode !='k01' ) {
        this.$router.push("/403")
    }
    
    DepartmentService.getDepartments().then(res => {
      this.departments = res.data._embedded.department
    }).catch(error => console.log(error))


    JobTitleService.getJobTitles().then(res => {
      this.titles = res.data._embedded.jobTitle
    }).catch(error => console.log(error))
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
