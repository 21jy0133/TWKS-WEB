<template>
    <div v-if="!deleted">
    <h1 text-align="center">社員詳細情報</h1>

    <div class= "mb-8" v-if="employeeData" id="table">
        <thead>
            <tr>
                <td>社員番号：</td>
                <td>{{ employeeData.empId }}</td>
            </tr>
            <tr>
                <td>メールアドレス：</td>
                <td>{{ employeeData.email }}</td>
            </tr>
            <tr>
                <td>名前：</td>

                <td>{{ employeeData.name }}</td>
            </tr>
            <tr>
                <td>フリガナ：</td>
                <td>{{ employeeData.kana }}</td>
            </tr>
            <tr>
                <td>電話番号：</td>
                <td>{{ employeeData.tel }}</td>
            </tr>
            <tr>
                <td>郵便番号：</td>
                <td>{{ employeeData.postCode }}</td>
            </tr>
            <tr>
                <td>住所：</td>
                <td>{{ employeeData.address }}</td>
            </tr>
            <tr>
                <td>生年月日：</td>
                <td>{{ employeeData.birthday }}</td>
            </tr>
            <tr>
                <td>性別：</td>
                <td>{{ employeeData.sex }}</td>
            </tr>
            <tr>
                <td>部署：</td>
                <td>{{ employeeData.department.deptName }}</td>
            </tr>
            <tr>
                <td>職役：</td>
                <td>{{ employeeData.jobTitle.name }}</td>
            </tr>
            <tr>
                <td>入社日：</td>
                <td>{{ employeeData.initDate }}</td>
            </tr>

        </thead>

    </div>
    <v-btn class="mx-2" color="primary" elevation="2" @click="goBack()" large>戻る</v-btn>
    <v-btn v-if="$store.state.user.userDetail.department.deptCode == 'k01'" class="mx-2" color="primary" elevation="2" large @click="gotoUpdate()">情報更新</v-btn>
    <v-dialog v-if="employeeData && $store.state.user.userDetail.department.deptCode == 'k01'" v-model="dialog" persistent>
        <template v-slot:activator="{ props }">
            <v-btn color="pink" :disabled="employeeData.empId == $store.state.user.userDetail.empId || (employeeData.jobTitle.code=='k' && employeeData.department.deptCode=='k01')" v-bind="props">
                アカウント削除
            </v-btn>
        </template>
        <v-card max-width="400">
            <v-card-title class="text-h5">
                削除しますか
            </v-card-title>
            <v-card-text>該当社員のアカウントを削除しますか</v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green-darken-1" variant="text" @click="dialog = false">
                    いいえ
                </v-btn>
                <v-btn color="green-darken-1" variant="text" @click="dialog = false, gotoDelete()">
                    はい
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

</div>

    <div v-if="deleted">
        <h1>該当社員のアカウントを削除しました</h1>
    </div >
</template>

<script>
import EmployeeService from '../../services/employee.service'

// 




export default {

    data() {
        return {
            dialog: false,
            deleted: false,
            index: 0,
            list: [],
            employeeData: null,
        }
    },
    methods: {
        goToData() {
            this.$router.push('/data')
        },


        goBack() {
            this.$router.go(-1)
        },
        gotoDelete(){

            EmployeeService.deleteEmployeeById(this.employeeData.empId).then(res => {
                this.deleted = true
            })
        },
        gotoUpdate(){
            this.$router.push({name:'Employee-update-id', params: { id: this.$route.params.id }})

        }

    },
    computed: {
    },
    mounted() {

        EmployeeService.getEmployeeById(this.$route.params.id).then( res => {
            

            if (res.data.department.deptCode != this.$store.state.user.userDetail.department.deptCode && this.$store.state.user.userDetail.department.deptCode !='k01' ) {
                this.$router.push("/403")
            }

            this.employeeData = res.data

        }).catch(error => this.$router.push("/404"))

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

.table {
    height: 80%;
    width: 80%;
    font-weight: 1000;
    border-collapse: collapse;
    margin-left: auto;
    margin-right: auto;
    text-align: center
}

tr:nth-child(odd) {
    background-color: #ddd;
    /* 背景色指定 */
}

th,
td {
    padding: 5px 10px;
    /* 余白指定 */
}
</style>
