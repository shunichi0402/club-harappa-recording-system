<template>
  <div>
    <h1>ランキングページ</h1>
    <RankingTableComponent :records="records" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRecordStore } from '../stores/recordStore'
import RankingTableComponent from '../components/RankingTable.vue'

const recordStore = useRecordStore()
const records = ref([])

const fetchRecords = async () => {
  await recordStore.fetchRecords()
  records.value = recordStore.records
}

onMounted(() => {
  fetchRecords()
})
</script>

<style scoped>
h1 {
  margin-bottom: 20px;
  color: #4CAF50;
  font-size: 2.5em;
}
</style>
