<template>
    <div id="box">

        <div class="add">
            <v-card width="400px">
                <v-card-title>
                    <h1>ログイン</h1>

                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid">
                        <v-card-subtitle>メールアドレス</v-card-subtitle>
                        <v-text-field v-model="email" :rules="emailRules" label="メールアドレス" :counter="100"
                            required></v-text-field>

                        <v-card-subtitle>パスワード</v-card-subtitle>
                        <v-text-field v-model="password" :rules="pwRules" label="パスワード" :counter="12"
                            required></v-text-field>

                        <v-btn color="primary" elevation="2" large :disabled="invalid" @click="validate()">ログイン</v-btn>
                    </v-form>
                </v-card-text>
            </v-card>
        </div>
    </div>
</template>

<route lang="yaml">
    meta: { requiresAuth: false} 
 </route>

<script>

export default {
    //namerules: [
    //    value => !!value && '必要項目',
    //],
    // pwrules: [
    //     value => !!value && '必要項目',
    // ],

    data: () => ({
        valid: true,
        password: '',
        invalid: false,
        pwRules: [
            v => !!v || '必要項目',
            //v => (v && v.length !== 12) || '12位入力してください',

            //v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        ],
        email: '',
        emailRules: [
            v => !!v || '必要項目',

            v => /.+@.+\..+/.test(v) || 'メールアドレスは正しくありません',
        ],



    }),


    methods: {
        async handleLogin(user) {
            //this.loading = true;

            this.$store.dispatch("auth/login", user).then(
                () => {
                    this.$router.push("/main").then(() => { this.$router.go() })
                },
                (error) => {
                    this.loading = false;
                    this.message =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                }
            )
        },

        async validate() {
            const { valid } = await this.$refs.form.validate()

            if (valid) {

                const user = Object.create({ email: this.email, password: this.password })

                this.handleLogin(user)

            } else {
                //this.$toast.error('Form is invalid, please check your input')
            }
        },
    },
}

</script>

<style scoped>
.read-the-docs {
    color: #888;
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
