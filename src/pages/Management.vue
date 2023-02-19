<template>
    <v-app-bar app>
        ooさん 管理


        <v-btn color="primary" elevation="2" large>社員管理</v-btn>
        <v-btn color="primary" elevation="2" large @click="goToData()">監視データ</v-btn>
        <router-link to="/login">ログアウト</router-link>

    </v-app-bar>

    <v-content>
            <v-container>
                <div id="search">
                    <v-form ref="form">
                        <v-row>

                            <v-col cols="12" sm="6" md="3"><v-text-field :rules="rules.id" required v-model="searchId"
                                    label="社員番号"></v-text-field></v-col>
                            <v-col cols="12" sm="6" md="3"> <v-text-field :rules="rules.name" required
                                    v-model="searchName" label="名前"></v-text-field>

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
                                <v-btn class="ml-2" color="primary" elevation="2" large
                                    @click="newlogin()">新入社員登録</v-btn>


                            </tr>
                        </thead>

                    </v-table>
                </div>

            </v-container>
    </v-content>


        <v-navigation-drawer floating permanent>
            <v-list dense rounded>
                <v-list-item v-for="item in departments" @click="selectDepartment(item)" :key="item.id" link>
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
                    部署
                </th>
                <th>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in selectedEmployees" :key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
                <td>{{ departments[item.department].name }}</td>
                <td><router-link :to="{ name: 'Employee-id', params: { id: item.id } }">詳細</router-link></td>


            </tr>
        </tbody>
    </v-table>

</template>

<script>

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

            rules: {
                name: [val => this.searchId.length > 0 || (val || '').length > 0 || '必須'],
                id: [val => this.searchName.length > 0 || (val || '').length > 0 || '必須'],
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
        searchEmployee() {
            this.$refs.form.validate().then((v) => {
                if (v.valid)
                    this.selectedEmployees = this.employees.filter(e => this.searchId ? (e.id.includes(this.searchId)) : true).filter(e => this.searchName ? (e.name.includes(this.searchName)) : true)
            })

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
