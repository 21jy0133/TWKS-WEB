<template>
  <v-content>

    <v-toolbar flat>
      <v-toolbar-title>
        情報更新
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-container v-if="!confirmMode">


      <v-card class="overflow-hidden">
        <v-card-text>
          <v-form v-if="employeeData" ref="form" lazy-validation>
            メールアドレス：
            <v-text-field v-model="employeeData.email" disabled></v-text-field>
            名前：
            <v-text-field v-model="employeeData.name" disabled></v-text-field>
            フリガナ：
            <v-text-field v-model="employeeData.kana" disabled></v-text-field>
            電話番号：
            <v-text-field v-model="employeeData.tel" label="電話番号" :rules="telrules" :counter="11" required></v-text-field>
            郵便番号：
            <v-text-field v-model="employeeData.postCode" label="郵便　'-'なし入力してください" :rules="postrules" :counter="7"
              required></v-text-field>
            住所：
            <v-text-field v-model="employeeData.address" label="住所" :rules="addrules" :counter="100"
              required></v-text-field>
            生年月日：
            <v-text-field v-model="employeeData.birthday" label="生年月日" disabled></v-text-field>
            部署:
            <v-container fluid>
              <v-row>
                <v-col class="d-flex" cols="6" sm="4">
                  <v-select v-model="employeeData.department.deptCode" :items="departments"
                    :disabled="($store.state.user.userDetail.jobTitle.code == 'k' && employeeData.empId == $store.state.user.userDetail.empId) || (employeeData.department.deptCode == 'k01' && employeeData.jobTitle.code == 'k' && $store.state.user.userDetail.jobTitle.code == 's')"
                    label="部署" :rules="[v => !!v || '必要項目']" item-value="deptCode" item-title="deptName"></v-select>
                </v-col>

              </v-row>
            </v-container>
            職役:
            <v-container fluid>
              <v-row>
                <v-col class="d-flex" cols="6" sm="4">
                  <v-select v-model="employeeData.jobTitle.code" :items="titles"
                    :disabled="($store.state.user.userDetail.jobTitle.code == 'k' && employeeData.empId == $store.state.user.userDetail.empId) || (employeeData.department.deptCode == 'k01' && employeeData.jobTitle.code == 'k' && $store.state.user.userDetail.jobTitle.code == 's')"
                    label="役職" :rules="[v => !!v || '必要項目']" item-value="code" item-title="name"></v-select>
                </v-col>

              </v-row>
            </v-container>
            性別：
            <v-text-field v-model="employeeData.sex" label="女" disabled></v-text-field>
            入社日：
            <v-text-field v-model="employeeData.initDate" label="入社日" disabled></v-text-field>
          </v-form>

        </v-card-text>
      </v-card>
      <v-btn color="primary" elevation="2" large @click="goBack()">戻る</v-btn>
      <v-btn color="primary" elevation="2" :disabled="invalid" type="submit" large @click="validate()">次へ</v-btn>


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
          <v-input :messages="[employeeData.birthday]">
            生年月日
          </v-input>
        </v-col>
        <v-col cols="12">
          部署
          <v-select v-model="employeeData.department.deptCode" :items="departments" disabled :rules="[v => !!v || '必要項目']"
            item-value="deptCode" item-title="deptName"></v-select>
        </v-col>
        <v-col cols="12">
          役職
          <v-select v-model="employeeData.jobTitle.code" :items="titles" disabled :rules="[v => !!v || '必要項目']"
            item-value="code" item-title="name"></v-select>
        </v-col>
        <v-col cols="12">
          <v-input :messages="[employeeData.sex]">
            性別
          </v-input>
        </v-col>
        <v-col cols="12">
          <v-input :messages="[employeeData.initDate]">
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
import { setTransitionHooks } from 'vue'
import DepartmentService from '../../../services/department.service'
import EmployeeService from '../../../services/employee.service'
import JobTitleService from '../../../services/jobTitle.service'

export default {

  data: () => ({
    employeeData: null,
    confirmMode: false,
    dialog: false,
    restData: [],
    //return: {
    //  column: null,
    //  row: null,
    //},
    year: ['1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000',],
    month: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
    day: ['1',],
    departments: [],
    titles: [],
    telrules: [
      value => !!value || '必要項目',
      value => (value && value.length !== 11) && '電話番号は正しくありません',
      value => (/^\d+$/.test(value)) || '数字を入力してください',

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
    goBack() {
      this.$router.go(-1)
    },
    async validate() {
      const { valid } = await this.$refs.form.validate()
      if (valid) {
        this.confirmMode = true
        window.scrollTo(0, 0);
      } else {

      }
    },

    save() {

      let { empId, ...updateData } = this.employeeData

      updateData.department = DepartmentService.idToResourse(updateData.department.deptCode)
      updateData.jobTitle = JobTitleService.idToResourse(updateData.jobTitle.code)

      EmployeeService.patchEmployeeById(this.$route.params.id, updateData).then(res => {



        if (this.$store.state.user.userDetail.empId != empId && this.employeeData.department.deptCode == 'k01' && this.employeeData.jobTitle.code == 'k') {

          EmployeeService.patchEmployeeById(this.$store.state.user.userDetail.empId, { jobTitle: JobTitleService.idToResourse('s') }).then(res => {

            this.updated = true
            this.confirmMode = false
            window.scrollTo(0, 0);
            this.$router.push('/employee/' + this.employeeData.empId).then(() => { this.$router.go() })

          })

        } else {
          this.updated = true
          this.confirmMode = false
          window.scrollTo(0, 0);
          this.$router.push('/employee/' + this.employeeData.empId)
        }

      }).catch(error => console.log(error))
    }
  },
  mounted() {

    if (this.$store.state.user.userDetail.department.deptCode != 'k01') {
      this.$router.push("/403")
    }

    EmployeeService.getEmployeeById(this.$route.params.id).then(res => {
      this.employeeData = res.data

    }).catch(error => this.$router.push("/404"))





    DepartmentService.getDepartments().then(res => {
      this.departments = res.data._embedded.department.filter(x => x.deptCode == this.$store.state.user.userDetail.department.deptCode || this.$store.state.user.userDetail.department.deptCode == 'k01')
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
  