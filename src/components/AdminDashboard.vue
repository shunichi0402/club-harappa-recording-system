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
  background-color: #f8f9fa;
  border-radius: 8px;
}

nav li {
  margin: 5px 10px;
  border: #999 1px solid;
  border-radius: 8px;
}

nav li a {
  display: block;
  padding: 10px 15px;
  text-decoration: none;
  color: #333;
  border-radius: 4px;
  transition: all 0.3s, color 0.3s;
}

nav li:hover {
  border: #2b632d 1px solid;
}
</style>
