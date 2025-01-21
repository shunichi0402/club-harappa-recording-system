<template>
  <div class="page-container">
    <div class="login-container">
      <h2>管理者ログイン</h2>
      <form @submit.prevent="auth.login">
        <div>
          <label for="email">メールアドレス</label>
          <input type="email" v-model="auth.email" required />
        </div>
        <div>
          <label for="password">パスワード</label>
          <input type="password" v-model="auth.password" required />
        </div>
        <button type="submit">ログイン</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
</script>

<style scoped>
.page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
}

.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 2em;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
}

h2 {
  text-align: center;
  color: #333;
}

label {
  display: block;
  margin-bottom: 0.5em;
  color: #555;
}

input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 0.75em;
  margin-bottom: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 0.75em;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}
</style>
