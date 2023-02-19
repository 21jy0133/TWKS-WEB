

<template>
  <v-app-bar app>
    ooさん 管理
    <v-btn color="primary" elevation="2" large @click="goToManagement()">社員管理</v-btn>
    <v-btn color="primary" elevation="2" large @click="goToData()">監視データ</v-btn>
    <router-link to="/login">ログアウト</router-link>

  </v-app-bar>
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
          <Datepicker v-model="pickedDate"></Datepicker>
          選択日付: {{ pickedDate }}
        </div>
      </v-form>

    </v-container>
  </v-content>
  <hr>
  <p>デフォルトの日時：</p>
  <h3>2023年2月16日</h3>


  <v-navigation-drawer floating permanent>
    <v-list dense rounded>
      <v-list-item v-for=" item in departments" @click="selectDepartment(item)" :key="item.id" link>
        <v-list-item-content>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
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
      <tr v-for="item in selectedEmployees" :key="jy0001">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td> <v-chart @click="chartClickHandler" class="chart" :option="option" /> </td>
        <router-link to="/dataedit" @click="gotoDataedit">編集</router-link>

      </tr>
    </tbody>
</v-table>
</template>

<script>
import { looseIndexOf } from '@vue/shared';
import { getCurrentInstance, onMounted } from 'vue';
import "echarts";
//import * as echarts from 'echarts';

export default {
  data() {
    return {
      menu: "",
      text: "",
      pickedDate: "",

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

      departments: {
        'i1': {
          id: 'i1',
          name: '情報一課'
        },
        'i2': {
          id: 'i2',
          name: '情報二課'
        },
        'b1': {
          id: 'b1',
          name: '営業課'
        },
        'm1': {
          id: 'm1',
          name: '管理課'
        },
      },
      employees: [
        {
          id: 'jy0001',
          name: 'AAA',
          department: 'i1',

        },
        {
          id: 'jy0002',
          name: 'BBB',
          department: 'i1',
        },
        {
          id: 'jy0003',
          name: 'CCC',
          department: 'i1',
        },
        {
          id: 'jy0004',
          name: 'DDD',
          department: 'i1',
        },
        {
          id: 'jy0005',
          name: 'EEE',
          department: 'i1',
        },
        {
          id: 'jy0006',
          name: 'FFF',
          department: 'i1',
        },
        {
          id: 'jy0007',
          name: 'GGG',
          department: 'i2',
        },
        {
          id: 'jy0008',
          name: 'HHH',
          department: 'i2',
        },
        {
          id: 'jy0009',
          name: 'III',
          department: 'i2',
        },
        {
          id: 'jy0010',
          name: 'JJJ',
          department: 'i2',
        },

      ],
      option :{
          /*
        title: {
          text: 'Stacked Line'
        },*/
        tooltip: {
          trigger: 'axis',

        },
        /*
        legend: {
          data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
        },*/

        grid: {
          left: '3%',
          right: '4%',
          bottom: '4%',
          containLabel: true
        },

        xAxis: {
          //type: 'category',
          //nameLocation: 'middle',
          //boundaryGap: false,
          data: ['9:00', '9:10', '9:20', '9:30', '9:40', '9:50', '10:00', '10:10', '10:20', '10:30', '10:40', '10:50', '11:00', '11:10', '11:20', '11:30', '11:40', '11:50', '12:00', '13:00', '13:10', '13:20', '13:30', '13:40', '13:50', '14:00', '14:10', '14:20', '14:30', '14:40', '14:50', '15:00', '16:00', '17:00']
        },
        yAxis: {
          //type: 'value',
          //axisLabel: {
          //formatter: '{value}'
          //},

          //axisPointer: {
          // snap: true
          //}
        },
        visualMap: {
          type: 'piecewise',
          show: false,
          dimension: 0,
          seriesIndex: 0,
        },
        series: [
        {
            name: 'マウスクリック',
            triggerLineEvent: true,
            type: 'line',

            smooth: true,
            stack: 'Total',
            data: [1200, 132, 101, 134, 90, 230, 210, 70, 182, 191, 234, 290, 330, 310, 191, 234, 290, 330, '-', '-', 210, 101, 134, 90, 210, 70],
            markArea: {
              itemStyle: {
                color: 'rgba(255, 173, 177, 0.4)'
              },

              data: [
                [

                  {
                    name: '休憩時間',
                    xAxis: '12:00',
                  },
                  {
                    xAxis: '13:00'
                  }

                ]
              ],
            }
          },
          {
            triggerLineEvent: true,
            name: 'キーボードクリック',
            type: 'line',
            stack: 'Total',
            data: [700, 182, 191, 234, 290, 330, 310, 120, 132, 101, 134, 90, 230, 210, 101, 134, 90, 230, '-', 310, 191, 234, 290, 1330, 1320],


          },
          {
            triggerLineEvent: true,
            name: 'マウス移動',
            type: 'line',
            stack: 'Total',
            data: [1000, 932, 901, 934, 1290, 1330, 1320, 1000, 932, 901, 934, 1290, 1330, 1320, 134, 90, 230, 210, '-', 101, 134, 90, 230,],

          },
        ]
      },
    }
  },
  methods: {
    selectDepartment(department) {
      this.selectedDepartment = department.id
      this.selectedEmployees = this.employees.filter(e => e.department == this.selectedDepartment)
    },
    goToData() {
      this.$router.push('/data')
    },
    newlogin() {
      this.$router.push('/newlogin')
    },
    goToManagement() {
      this.$router.push('/management')
    },
    gotoDataedit() {
      this.$router.push('/dataedit')
    },
    searchEmployee() {
      this.$refs.form.validate().then((v) => {
        if (v.valid)
          this.selectedEmployees = this.employees.filter(e => this.searchId ? (e.id.includes(this.searchId)) : true).filter(e => this.searchName ? (e.name.includes(this.searchName)) : true)
      })
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
