<template>
    <v-app-bar app>
        ooさん 管理


        <v-btn color="primary" elevation="2" large>社員管理</v-btn>
        <v-btn color="primary" elevation="2" large @click="goToData()">監視データ</v-btn>
        <router-link to="/login">ログアウト</router-link>

    </v-app-bar>
    <h1 text-align="center">社員詳細情報</h1>
    <div id="table">
        <thead>
            <tr>
                <td>社員番号：</td>
                <td>{{ e.id }}</td>
            </tr>
            <tr>
                <td>メールアドレス：</td>
                <td>{{ e.mail }}</td>
            </tr>
            <tr>
                <td>名前：</td>

                <td>{{ e.name }}</td>
            </tr>
            <tr>
                <td>フリガナ：</td>
                <td>{{ e.kana }}</td>
            </tr>
            <tr>
                <td>電話番号：</td>
                <td>{{ e.tel }}</td>
            </tr>
            <tr>
                <td>郵便番号：</td>
                <td>{{ e.post }}</td>
            </tr>
            <tr>
                <td>住所：</td>
                <td>{{ e.address }}</td>
            </tr>
            <tr>
                <td>生年月日：</td>
                <td>{{ e.birthday }}</td>
            </tr>
            <tr>
                <td>部署：</td>
                <td>{{ e.departments }}</td>
            </tr>
            <tr>
                <td>職役：</td>
                <td>{{ e.office }}</td>
            </tr>
            <tr>
                <td>入社日：</td>
                <td>{{ e.joiningdate }}</td>
            </tr>

        </thead>

    </div>
    <v-btn color="primary" elevation="2" @click="goToManagement()" large>戻る</v-btn>
    <v-btn color="primary" elevation="2" large @click="gotoNewlogin3()">情報更新</v-btn>
    <v-dialog v-model="dialog" persistent>
        <template v-slot:activator="{ props }">
            <v-btn color="pink" v-bind="props">
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

    <div v-if="e">
        {{ }}
    </div>
    <div v-else>
        404
    </div>
</template>

<script>



export default {

    data() {
        return {
            dialog: false,
            selectedDepartment: null,
            selectOffice: null,
            index: 0,
            list: [],
            data: [],

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
            selectOffice: {
                'o1': {
                    id: 'o1',
                    name: '社員'
                },
                'o2': {
                    id: 'o2',
                    name: 'リーダー'
                },
                'o3': {
                    id: 'o3',
                    name: '管理'
                }

            },
            employees: [
                {

                    id: 'jy0001',
                    mail: '21jy0133@jec.ac.jp',
                    name: 'AAA',
                    kana: 'あああ',
                    tel: '0801234567',
                    post: '1170000',
                    address: '新宿区1-1-1',
                    birthday: '1990年1月1日',
                    departments: 'i1',
                    office: 'o1',
                    joiningdate: '2000年4月1日'


                },
                {
                    id: 'jy0002',
                    name: 'BBB',
                    department: 'i1',
                    kana: 'いいい',
                    tel: '0801234567',
                    post: '1170000',
                    address: '新宿区1-1-2',
                    birthday: '1990年2月1日',
                    departments: '情報一課',
                    office: '社員',
                    office: 'o1',
                    joiningdate: '2000年4月1日'

                },
                {
                    id: 'jy0003',
                    name: 'CCC',
                    kana:'ううう',
                    tel: '0801234567',
                    post: '1170000',
                    address: '新宿区1-1-2',
                    birthday: '1991年3月1日',
                    department: 'i1',
                    office: 'o1',
                    joiningdate: '2021年4月1日'
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
        goToData() {
            this.$router.push('/data')
        },


        goToManagement() {
            this.$router.push('/management')
        },
        gotoDelete(){
            this.$router.push('/deleted')
        },
        gotoNewlogin3(){
            this.$router.push('/newlogin3')}

    },
    computed: {
        e() {
            return this.employees.filter(x => x.id == this.$route.params.id)[0]
        }
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
