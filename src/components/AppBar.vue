<template>
    <v-app-bar v-if="loggedIn" app>


        <v-app-bar-title>TWKSシステム</v-app-bar-title>


       <p v-if="$store.state.user.userDetail"> {{$store.state.user.userDetail.name}}さん </p> <p class="ml-2" v-if="$store.state.user.userDetail && $store.state.user.userDetail.department">{{ $store.state.user.userDetail.department.deptCode=="k01"?"  | 管理":"" }}</p>


        <v-spacer></v-spacer>


        <v-btn class="mr-2" color="primary" elevation="2" large @click="goToManagement()">社員管理</v-btn>
        <v-btn class="mr-2" color="primary" elevation="2" large @click="goToData()">監視データ</v-btn>
        <v-btn class="mr-2" color="primary" elevation="2" large @click="logOut()">ログアウト</v-btn>
    </v-app-bar>


    <v-app-bar v-else app>

        <v-app-bar-title>TWKSシステム</v-app-bar-title>

        <v-spacer></v-spacer>

        <v-btn class="mr-2" color="primary" elevation="2" large @click="goToLogin()">ログイン</v-btn>


    </v-app-bar>
</template>

<script>

export default {
    data() {
        return {
            dialog: false,
        }
    },

    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        },
    },


    methods: {
        goToManagement() {
            this.$router.push('/management')
        },
        goToData() {
            this.$router.push('/data')
        },
        logOut() {
            this.$store.dispatch("auth/logout")
            this.$store.dispatch("user/clear")
            this.$router.push('/')
        },
        goToLogin() {

            this.$router.push('/login')

        }
    },

    mounted() {
        this.$store.dispatch("user/getUserDetail")
    }
}

</script>