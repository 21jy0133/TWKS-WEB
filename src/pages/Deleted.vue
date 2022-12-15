<template>
    <v-app-bar app>
        ooさん 管理


        <v-btn color="primary" elevation="2" large>社員管理</v-btn>
        <v-btn color="primary" elevation="2" large @click="goToData()">監視データ</v-btn>
        <router-link to="/login">ログアウト</router-link>

    </v-app-bar>
    <h1>該当社員のアカウントを削除しました</h1>


    
    
</template>

<script>

export default {
   
    
    methods: {
        selectDepartment(department) {
            this.selectedDepartment = department.id
        },
        goToData(){
            this.$router.push('/data')
        },
        newlogin(){
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
