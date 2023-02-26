<template>
    <h1 text-align="center">社員出勤データ</h1>
    <div class="mb-8" v-if="employeeData" id="table">
        <thead>
            <tr>
                <td>社員番号：</td>
                <td>{{ employeeData.empId }}</td>
            </tr>
            <tr>
                <td>名前：</td>
                <td>{{ employeeData.name }}</td>
            </tr>
        </thead>

        <div>
            <Datepicker v-model="pickedDate" :enable-time-picker="false"></Datepicker>
        </div>

    </div>

    <v-table>
        <thead>
            <tr>
                <th class="text-left">
                    データ
                </th>
                <th>
                </th>
            </tr>
        </thead>

        <tbody v-if="employeeData">
            <tr>
                <td>
                    <DataChart :empId="employeeData.empId" :pickedDate="pickedDate"></DataChart>
                </td>

            </tr>
        </tbody>
    </v-table>
    <v-container>

        <v-row v-for="rest in restData">

            <Datepicker class="mx-2" v-model="rest.startTime" :enable-date-picker="false"></Datepicker>

            <div> ~ </div>

            <Datepicker class="mx-2" v-model="rest.endTime" :enable-date-picker="false"></Datepicker>

            <button @click="saveRestTime(rest)">保存</button>

        </v-row>

        <v-row v-if="restData.length == 0">

            <Datepicker class="mx-2" v-model="newrest.startTime" :enable-date-picker="false"></Datepicker>

            <div> ~ </div>

            <Datepicker class="mx-2" v-model="newrest.endTime" :enable-date-picker="false"></Datepicker>

            <button @click="addRestTime()">追加</button>
        </v-row>

    </v-container>

    <!--v-btn class="mx-2" color="primary" elevation="2" @click="goBack()" large>戻る</v-btn-->
</template>

<script>
import EmployeeService from '../../../../services/employee.service'

import DataChart from '../../../../components/DataChart.vue'

import RestDataService from '../../../../services/restData.service'




export default {
    components: {
        DataChart
    },
    data() {
        return {
            dialog: false,
            index: 0,
            pickedDate: null,
            restData: [],
            newrest: {},
            list: [],
            employeeData: null,
        }
    },
    watch: {
        // whenever question changes, this function will run
        pickedDate() {
            RestDataService.seachEmpIdData(this.employeeData.empId, this.pickedDate.toLocaleString('sv').slice(0, 10)).then(res => {
                this.restData = res.data._embedded.restTime
            })
        }
    },
    methods: {
        goToData() {
            this.$router.push('/data')
        },


        goToManagement() {
            this.$router.push('/management')
        },
        gotoDelete() {
            this.$router.push('/deleted')
        },
        gotoNewlogin3() {
            this.$router.push({ name: 'Employee-update-id', params: { id: this.$route.params.id } })

        },
        saveRestTime(rest) {


            RestDataService.patchRestTimeById(rest.restTimeId, rest).then(res => {
                alert("更新した！")
                this.pickedDate = new Date(this.pickedDate.getTime())
            })


        },

        addRestTime() {
            this.newrest.restTimeId = this.employeeData.empId + this.newrest.startTime.toISOString().replace(/[^0-9]/g, '').slice(0, -3) + 'r'

            this.newrest.employee = EmployeeService.idToResourse(this.employeeData.empId)


            RestDataService.addRestTime(this.newrest).then(res => {
                alert("追加した！")
                this.pickedDate = new Date(this.pickedDate.getTime())
                

                RestDataService.seachEmpIdData(this.employeeData.empId, this.pickedDate.toLocaleString('sv').slice(0, 10)).then(res => {
                this.restData = res.data._embedded.restTime
                })
            })


        }

    },
    computed: {
    },
    mounted() {

        EmployeeService.getEmployeeById(this.$route.params.id).then(res => {

            if (this.$store.state.user.userDetail.jobTitle.code !='k' ) {
                this.$router.push("/403")
            }

            if (res.data.department.deptCode != this.$store.state.user.userDetail.department.deptCode && this.$store.state.user.userDetail.department.deptCode !='k01' ) {
                this.$router.push("/403")
            }

            this.employeeData = res.data

            if (this.$route.query.pickedDate && this.$route.query.pickedDate.length > 0) {
                console.log(this.$route.query.pickedDate)

                this.pickedDate = new Date(this.$route.query.pickedDate * 1)

            } else {
                let d = new Date();
                d.setDate(d.getDate() - 1);
                d.setMinutes(0)
                d.setHours(0)
                this.pickedDate = d // .toLocaleString( 'sv' ).slice(0,10);
                this.pickedDate = new Date(d.getTime()); // .toLocaleString( 'sv' ).slice(0,10);
            }

            RestDataService.seachEmpIdData(this.employeeData.empId, this.pickedDate.toLocaleString('sv').slice(0, 10)).then(res => {
                this.restData = res.data._embedded.restTime
            })




        }).catch(error => this.$router.push("/404"))
    
    }
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

th,
td {
    padding: 5px 10px;
    /* 余白指定 */
}
</style>
