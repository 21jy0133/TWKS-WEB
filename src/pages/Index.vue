

<template>

   <v-content>
      <div>
         <v-card class="index">
            <v-responsive :aspect-ratio="16 / 9">
               <h1>TWKSシステム</h1>  
               <v-card-text>
                  <router-link to="/login">ログイン画面へ</router-link>
               </v-card-text>
            </v-responsive>
         </v-card>
      </div>
   </v-content>
</template>
<style>
.index {
   background-color: #ffefd5;
   width: 800px;
   padding: 30px 50px;
   margin: 30px auto;
   border-radius: 30px;
   line-height: 200px;

}

h1 {
   font-size: 48px;
   text-align: center;
   font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif,
}



</style>