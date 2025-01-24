<template>
    <div class="footer">
        <div class="footer-content">
            &copy; {{ new Date().getFullYear() }} 紙飛行機大会記録管理システム
        </div>
    </div>
</template>

<script setup>
// No additional imports or setup needed
</script>

<style scoped>
.footer {
  background-color: #4CAF50;
  color: white;
  text-align: center;
  padding: 10px 0;
  /* position: fixed; */
  width: 100%;
  /* bottom: 0; */
}

.footer-content {
  font-size: 1em;
}
</style>
