<template>
  <header class="header">
    <div class="header-title">紙飛行機大会記録管理システム</div>
    <nav class="header-nav">
      <button class="nav-button" @click="goHome">ホーム</button>
      <button class="nav-button" @click="goRanking">ランキング</button>
      <button v-if="!auth.user" class="nav-button" @click="goLogin">ログイン</button>
      <div v-else class="user-info">
        <span>{{ auth.user.email }}</span>
        <button class="nav-button" @click="goDashboard">ダッシュボード</button>
        <button class="nav-button" @click="auth.logout">ログアウト</button>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const auth = useAuthStore()

function goHome() {
  router.push('/')
}

function goRanking() {
  router.push('/ranking')
}

function goLogin() {
  router.push('/login')
}

function goDashboard() {
  router.push('/dashboard')
}
</script>

<style scoped>
.header {
  background-color: #4CAF50;
  color: white;
  padding: 5px 20px; /* 縦のパディングを短くしました */
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-title {
  font-weight: bold;
  font-size: 1.2em; /* 文字サイズを小さくしました */
}

.header-nav {
  display: flex;
  gap: 10px;
}

.nav-button {
  background: none;
  border: none;
  color: white;
  font-size: 0.9em; /* 文字サイズを小さくしました */
  padding: 5px 15px; /* 縦のパディングを短くしました */
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.nav-button:hover {
  background-color: #45a049;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
