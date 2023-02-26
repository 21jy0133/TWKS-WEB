

<template>
  <v-content>
    <v-container>
      <v-form ref="form">
        <v-row>

          <v-col cols="12" sm="4"><v-text-field :rules="rules.id" required v-model="searchId"
              label="社員番号"></v-text-field></v-col>
          <v-col cols="12" sm="4"> <v-text-field :rules="rules.name" required v-model="searchName"
              label="名前"></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-btn color="primary" elevation="2" large @click="searchEmployee()">検索</v-btn>
          </v-col>
        </v-row>
        <div>
          <Datepicker v-model="pickedDate" :enable-time-picker="false"></Datepicker>
        </div>
      </v-form>
    </v-container>
  </v-content>


  <v-navigation-drawer floating permanent>
    <v-list dense rounded>
      <v-list-item :active="item.deptCode == this.selectDepartment" v-for=" item in departments"
        @click="selectDepartment(item.deptCode)" :key="item.id" link>
        <v-list-item-content>
          <v-list-item-title>{{ item.deptName }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-table>
    <thead>
      <tr>
        <th class="text-left">
          社員番号
        </th>
        <th class="text-left">
          名前
        </th>
        <th class="text-left">
          データ
        </th>
        <th>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in selectedEmployees" :key="item.id">
        <td>{{ item.empId }}</td>
        <td>{{ item.name }}</td>
        <td>
          <DataChart :empId="item.empId" :pickedDate="pickedDate"></DataChart>
        </td>

        <td>

          <router-link :to="'/employee/data/' + item.empId + '?pickedDate='+ pickedDate.getTime()">詳細</router-link>

          <router-link v-if="$store.state.user.userDetail.jobTitle.code == 'k'" class="ml-2" :to="'/employee/data/edit/' + item.empId + '?pickedDate='+ pickedDate.getTime()">編集</router-link>

        </td>

      </tr>
    </tbody>
  </v-table>
</template>

<script>
import DepartmentService from '../services/department.service';
import DataChart from '../components/DataChart.vue'
import EmployeeService from '../services/employee.service';
//import * as echarts from 'echarts';

export default {

  components: {
    DataChart
  },
  watch: {
    // whenever question changes, this function will run
    pickedDate() {
      //console.log('pickedDate', this.pickedDate, this.$route.query.pickedDate, new Date(this.$route.query.pickedDate))
      this.$router.replace({ query: { ...this.$route.query, pickedDate: this.pickedDate.getTime() } })
    },
  },

  data() {
    return {
      menu: "",
      text: "",
      pickedDate: null,

      selectedDepartment: null,
      //selecteddatadata: null,
      index: 0,
      list: [],
      data: [],
      searchName: "",
      searchId: "",
      selectedEmployees: [],
      rules: {
        name: [val => this.searchId.length > 0 || (val || '').length > 0 || '必須'],
        id: [val => this.searchName.length > 0 || (val || '').length > 0 || '必須'],
      },


      departments: [],
      employees: [],
    }
  },
  methods: {
    selectDepartment(deptCode) {
      this.selectedDepartment = deptCode
      this.$router.replace({ query: { deptCode: deptCode, pickedDate: this.pickedDate.getTime() } })
      this.selectEmployee(this.selectedDepartment)
    },
    goToData() {
      this.$router.push('/data')
    },
    newlogin() {
      this.$router.push('/employee/add')
    },
    searchEmployee() {
      this.$refs.form.validate().then((v) => {
        if (v.valid)
          this.$router.replace({ query: { searchId: this.searchId, searchName: this.searchName, pickedDate: this.pickedDate.getTime() } })
        EmployeeService.seachEmployeesByIdOrName(this.searchId, this.searchName).then(response => {

          this.selectedEmployees = response.data._embedded.employee.filter(x=>x.department.deptCode== this.$store.state.user.userDetail.department.deptCode || this.$store.state.user.userDetail.department.deptCode =='k01')

        }

        ).catch(error => console.log(error))
      })

    },
    selectEmployee(deptCode) {

      console.log("selectEmployee")
      EmployeeService.getEmployeesByDept(deptCode).then(response => {

        this.selectedEmployees = response.data._embedded.employee.filter(x=>x.department.deptCode== this.$store.state.user.userDetail.department.deptCode || this.$store.state.user.userDetail.department.deptCode =='k01')

      }

      ).catch(error => console.log(error))

    },


    chartClickHandler(params) {
      console.log(params)
      this.$router.push('/image')
    },
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      this.text = `${year}${month}${day}`;
      this.menu = false;
      return;
    },

  },

  mounted() {

    console.log('this.$loading.active', this.$loading.active)
    this.$loading.active = true

    console.log('this.$loading.active', this.$loading.active)



    DepartmentService.getDepartments().then(response => {

      

      this.departments = response.data._embedded.department.filter(x=>x.deptCode== this.$store.state.user.userDetail.department.deptCode || this.$store.state.user.userDetail.department.deptCode =='k01')

      if (this.$route.query.pickedDate && this.$route.query.pickedDate.length > 0) {
        console.log(this.$route.query.pickedDate)

        this.pickedDate = new Date(this.$route.query.pickedDate*1)

      }
      else {

        let d = new Date();
        d.setDate(d.getDate() - 1);
        d.setMinutes(0)
        d.setHours(17)
        this.pickedDate = d // .toLocaleString( 'sv' ).slice(0,10);

      }

      if (this.$route.query.deptCode) {

        this.selectDepartment(this.$route.query.deptCode)

      }

      if (this.$route.query.searchName || this.$route.query.searchId) {
        this.searchId = this.$route.query.searchId
        this.searchName = this.$route.query.searchName
        this.searchEmployee()
      }

      this.$loading.active = false

    }

    ).catch(error => console.log(error))

  },
}

</script>
<style scoped>
.chart {
  height: 200px;
  width: 1000px;

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




h2 {
  text-align: center;
}
</style>
