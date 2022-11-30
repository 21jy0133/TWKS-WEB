<template>


    <div id="box">


        <div class="add">
            <v-card width="400px">
                <v-card-title>
                    <h1 class="display-1">ログイン</h1>
                </v-card-title>
                <v-card-text>
                    <v-form>
                        <v-text-field label="ユーザ名" />
                        <v-text-field type="password" label="パスワード" />
                        <v-card-actions>
                            <v-btn color="primary" elevation="2" large @click="goToMain()">ログイン</v-btn>
                            <router-link to="/main">Go to Main</router-link>
                        </v-card-actions>

                    </v-form>
                </v-card-text>
            </v-card>
        </div>
    </div>


</template>

<script>

export default {

    methods: {
        goToMain() {
            this.$router.push('/main')
        },
        

        }
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
