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

                <router-link v-if="$store.state.user.userDetail.jobTitle.code == 'k'" :to="'/employee/data/edit/' + employeeData.empId + '?pickedDate='+ pickedDate.getTime()">編集</router-link>

            </tr>
        </tbody>
    </v-table>

    <!--v-btn class="mx-2" color="primary" elevation="2" @click="goBack()" large>戻る</v-btn-->
</template>

<script>
import EmployeeService from '../../../services/employee.service'

import DataChart from '../../../components/DataChart.vue'




export default {
    components: {
        DataChart
    },
    data() {
        return {
            dialog: false,
            index: 0,
            pickedDate: null,
            list: [],
            employeeData: null,
        }
    },
    watch: {
        // whenever question changes, this function will run
        pickedDate() {
            //console.log('pickedDate', this.pickedDate, this.$route.query.pickedDate, new Date(this.$route.query.pickedDate))
            this.$router.replace({ query: { ...this.$route.query, pickedDate: this.pickedDate.getTime() } })
        },
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

        }

    },
    computed: {
    },
    mounted() {

        EmployeeService.getEmployeeById(this.$route.params.id).then(res => {

            console.log("12", res.data.department.deptCode != this.$store.state.user.userDetail.department.deptCode, this.$store.state.user.userDetail.department.deptCode !='k01')

            if (res.data.department.deptCode != this.$store.state.user.userDetail.department.deptCode && this.$store.state.user.userDetail.department.deptCode !='k01' ) {
                this.$router.push("/403")
                return
            }

            this.employeeData = res.data

            if (this.$route.query.pickedDate && this.$route.query.pickedDate.length > 0) {
                console.log(this.$route.query.pickedDate)

                this.pickedDate = new Date(this.$route.query.pickedDate * 1)

            } else {
                let d = new Date();
                d.setDate(d.getDate() - 1);
                d.setMinutes(0)
                d.setHours(17)
                this.pickedDate = d // .toLocaleString( 'sv' ).slice(0,10);
            }

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
