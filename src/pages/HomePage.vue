<template>
  <div>
    <div class="home-container">
      <div class="home-content">
        <h1>紙飛行機大会記録管理システム</h1>
        <p>このシステムは、紙飛行機大会の記録を管理するためのものです。</p>
        <button class="styled-button" @click="goToRanking">ランキングを見る</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function goToRanking() {
  router.push('/ranking');
}
</script>

<style scoped>
h1 {
  margin-bottom: 20px;
  color: #4CAF50;
  font-size: 2.5em;
}

p {
  margin-bottom: 20px;
  font-size: 1.2em;
  line-height: 1.5;
}

.home-container {
  background-color: white;
  padding: 40px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-top: 20px;
  text-align: center;
}

.home-content {
  max-width: 800px;
  margin: 0 auto;
}

.styled-button {
  font-size: 1.2em;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.styled-button:hover {
  background-color: #45a049;
}
</style>
