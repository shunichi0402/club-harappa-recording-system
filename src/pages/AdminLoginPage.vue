<template>
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
</template>

<script setup>
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
