

<template>
   

   <v-content>

     
      <div>
    <v-card class="index">
      
      <v-responsive :aspect-ratio="16/9">
         <h1>TWKSシステム</h1>
        <v-card-text>
         <router-link to="/login">ログイン場面へ</router-link>
        </v-card-text>
      </v-responsive>
    </v-card>
  </div>

</v-content>
</template>
<style>
.index {
   background-color:	#ffefd5;
   width: 800px;
   padding: 10px 50px;
   margin: 10px auto;
   border-radius: 5px;
}
h1{
   
   text-align: center;
   font-family:Petit Formal;
  
}
p{
   text-align: center;
}
</style>