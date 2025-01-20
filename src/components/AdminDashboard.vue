<template>
  <div>
    <h1>管理者ダッシュボード</h1>
    <nav>
      <ul>
        <li><router-link to="/dashboard/participants">参加者管理</router-link></li>
        <li><router-link to="/dashboard/participant-records">参加者記録登録</router-link></li>
        <li><router-link to="/dashboard/events">種目管理</router-link></li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
// 必要に応じてスクリプトを追加
</script>

<style scoped>
/* 必要に応じてスタイルを追加 */
nav ul {
  list-style-type: none;
  padding: 0;
}

nav li {
  margin: 10px 0;
}
</style>
