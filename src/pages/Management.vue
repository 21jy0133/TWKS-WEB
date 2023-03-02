<template>
    <v-content>
        <v-container>
            <div id="search">
                <v-form ref="form">
                    <v-row>

                        <v-col cols="12" sm="6" md="3"><v-text-field :rules="rules.id" required v-model="searchId"
                                label="社員番号"></v-text-field></v-col>
                        <v-col cols="12" sm="6" md="3"> <v-text-field :rules="rules.name" required v-model="searchName"
                                label="名前"></v-text-field>

                        </v-col>

                    </v-row>
                </v-form>
                <v-table>
                    <thead>
                        <tr>
                            <!--v-text-field v-model="search" label="社員番号"></v-text-field-->
                            <!--v-search-field v-model="search" append-icon="mdi-magnify" label="社員番号" placeholder="Search"></v-search-field-->
                            <v-card v-for="item in filteredItems" :key="item.id">
                                {{ item.id }}
                            </v-card>
                            <!--v-text-field v-model="search" label="名前"></v-text-field>
                                            <v-card v-for="item in filteredItems" :key="item.id">
                                                {{ item.name }}
                                            </v-card>
                                            <th>社員番号:</th>
                                            <td><input v-model="input" placeholder="社員番号"></td>
                                            <th>名前:</th>
                                            <td><input v-model="input" placeholder="名前"></td-->
                            <v-btn color="primary" elevation="2" large @click="searchEmployee()">検索</v-btn>
                            <v-btn v-if="$store.state.user.userDetail.department.deptCode == 'k01'" class="ml-2" color="primary" elevation="2" large @click="newlogin()">新入社員登録</v-btn>


                        </tr>
                    </thead>

                </v-table>
            </div>

        </v-container>
    </v-content>


    <v-navigation-drawer floating permanent>
        <v-list dense rounded>
            <v-list-item :class="{ solid_border: item.deptCode == selectedDepartment }" v-for="item in departments" @click="selectDepartment(item.deptCode)" :key="item.deptCode" link>
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
                    部署
                </th>
                <th>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in selectedEmployees" :key="item.empId">
                <td>{{ item.empId }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.department.deptName }}</td>
                <td><router-link :to="{ name: 'Employee-id', params: { id: item.empId } }">詳細</router-link></td>


            </tr>
        </tbody>
    </v-table>
</template>

<script>

import DepartmentService from '../services/department.service';
import EmployeeService from '../services/employee.service';

export default {
    data() {
        return {
            selectedDepartment: null,
            index: 0,
            list: [],
            data: [],
            search: "",
            searchName: "",
            searchId: "",
            selectedEmployees: [],

            departments: {
            },
            employees: [
            ],

            rules: {
                name: [val => this.searchId.length > 0 || (val || '').length > 0 || '必須'],
                id: [val => this.searchName.length > 0 || (val || '').length > 0 || '必須'],
            },

        }
    },

    methods: {
        selectDepartment(deptCode) {
            this.selectedDepartment = deptCode
            this.$router.replace({ query: { deptCode:deptCode }})
            this.selectEmployee(this.selectedDepartment)
        },
        goToData() {
            this.$router.push('/data')
        },
        newlogin() {
            this.$router.push('/employee/add')
        },
        searchEmployee() {
            this.selectedDepartment = null
            this.$refs.form.validate().then((v) => {
                if (v.valid)
                    this.$router.replace({ query: { searchId:this.searchId, searchName: this.searchName }})


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

        }
    },

    mounted() {
        DepartmentService.getDepartments().then(response => {

            this.departments = response.data._embedded.department.filter(x=>x.deptCode== this.$store.state.user.userDetail.department.deptCode || this.$store.state.user.userDetail.department.deptCode =='k01')

            console.log(this.$route.query)


            if(this.$route.query.deptCode) {

                this.selectDepartment(this.$route.query.deptCode)

            }

            if(this.$route.query.searchName || this.$route.query.searchId) {
                this.searchId = this.$route.query.searchId
                this.searchName = this.$route.query.searchName
                this.searchEmployee()
            }

        }).catch(error => console.log(error))
    },
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


.solid_border {
    border: solid;
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
