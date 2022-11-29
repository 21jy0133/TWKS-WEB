<script setup>
import { ref } from 'vue'

//defineProps({
  //msg: String
//})


</script>

<template>
  <h1>{{ TWKSシステム }}</h1>

  <div id="box">
			<h1>TWKSシステム</h1>
			<hr> 	
			<div class="add">
				<h2>ログイン</h2> 
				<div class="form-group">
					<label for="usermail">メールアドレス：</label>
                        <input type="text" name="usermail" id="username"  placeholder="mail"/>
                </div>
                <div class="form-group">
					<label for="userpassword">　パスワード：　</label>
                        <input type="text" name="serpassword" id="serpassword"  placeholder="password"/>
                </div>
            
				<p><button @click="login()">ログイン</button></p>
				
			</div>
		</div>

 
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
