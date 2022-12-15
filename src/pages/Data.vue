

<template>

  <v-app-bar app>
    ooさん 管理


    <v-btn color="primary" elevation="2" large>社員管理</v-btn>
    <v-btn color="primary" elevation="2" large @click="goToData()">監視データ</v-btn>
    <router-link to="/login">ログアウト</router-link>

  </v-app-bar>

  <v-content>
    <v-form v-model="input">
      <v-container>
        <div id="search">
          <v-table>
            <thead>
              <tr>
                <th>社員番号:</th>
                <td><input v-model="input" placeholder="社員番号"></td>
                <th>名前:</th>
                <td><input v-model="input" placeholder="名前"></td>
                <v-btn color="primary" elevation="2" large @click="selectDepartment()">検索</v-btn>

              </tr>
            </thead>

          </v-table>
        </div>

      </v-container>
    </v-form>
  </v-content>


  <v-card elevation="12" width="256">
    <v-navigation-drawer floating permanent>
      <v-list dense rounded>
        <v-list-item v-for="item in departments" @click="selectDepartment(item)" :key="item.id" link>
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>


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
          部署
        </th>
        <th>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in employees.filter(e => e.department == selectedDepartment)" :key="item.id">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td><router-link :to="{ name: 'Employee-id', params: { id: item.id } }">詳細</router-link></td>
      </tr>
    </tbody>
  </v-table>

</template>

<script>
import * as echarts from 'echarts/core';
import {
  TooltipComponent,
  GridComponent,
  LegendComponent
} from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
echarts.use([
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  CanvasRenderer
]);

var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom);
var option;


export default {
  data() {
    return {
      selectedDepartment: null,
      index: 0,
      list: [],
      data: [],

      option: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // Use axis to trigger tooltip
            type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
          }
        },
        legend: {},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        series: [
          {
            name: 'Direct',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data1: [320, 302, 301, 334, 390, 330, 320]
          },
          {
            name: 'Mail Ad',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data1: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: 'Affiliate Ad',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data1: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: 'Video Ad',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data1: [150, 212, 201, 154, 190, 330, 410]
          },
          {
            name: 'Search Engine',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data1: [820, 832, 901, 934, 1290, 1330, 1320]
          }
        ]
      },
      option , myChart,setOption(option){},




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
    }
  },

  methods: {
    selectDepartment(department) {
      this.selectedDepartment = department.id
    },
    goToData() {
      this.$router.push('/data')
    },
    newlogin() {
      this.$router.push('/newlogin')
    }

  }
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
</style>
