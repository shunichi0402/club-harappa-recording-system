<template>
  <div>
    <h2>{{ eventName }}のランキング</h2>
    <select v-model="selectedEventId" @change="fetchRankings">
      <option v-for="event in events" :key="event.id" :value="event.id">{{ event.name }}</option>
    </select>
    <input v-model="searchName" @input="searchRanking" placeholder="名前で検索" />
    <table>
      <thead>
        <tr>
          <th>順位</th>
          <th>参加者名</th>
          <th>スコア</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(record, index) in paginatedRankings" :key="record.id" :class="{ highlight: isHighlighted(record.participantId) }">
          <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
          <td>{{ getParticipantName(record.participantId) }}</td>
          <td>{{ record.score }}</td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">前へ</button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">次へ</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRecordStore } from '../stores/recordStore'
import { useParticipantStore } from '../stores/participantStore'
import { db } from '../firebaseSetup'
import { collection, getDocs } from 'firebase/firestore'

const recordStore = useRecordStore()
const participantStore = useParticipantStore()

const rankings = computed(() => recordStore.records)
const events = ref([])
const selectedEventId = ref('')
const eventName = ref('')
const currentPage = ref(1)
const itemsPerPage = 3
const searchName = ref('')

const totalPages = computed(() => Math.ceil(rankings.value.length / itemsPerPage))
const paginatedRankings = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return rankings.value.slice(start, end)
})

async function fetchEvents() {
  const querySnapshot = await getDocs(collection(db, 'events'))
  events.value = querySnapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name }))
  if (events.value.length > 0) {
    selectedEventId.value = events.value[0].id
    eventName.value = events.value[0].name
    fetchRankings()
  }
}

async function fetchRankings() {
  if (!selectedEventId.value) return
  await recordStore.fetchRecordsByEventId(selectedEventId.value)
  const participantIds = recordStore.records.map(record => record.participantId)
  await participantStore.fetchParticipantsByIds(participantIds)
  const selectedEvent = events.value.find(event => event.id === selectedEventId.value)
  eventName.value = selectedEvent ? selectedEvent.name : ''
  currentPage.value = 1
}

function getParticipantName(participantId) {
  const participant = participantStore.participants.find(p => p.id === participantId)
  return participant ? participant.name : '不明'
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

function searchRanking() {
  const index = rankings.value.findIndex(record => getParticipantName(record.participantId).includes(searchName.value))
  if (index !== -1) {
    currentPage.value = Math.floor(index / itemsPerPage) + 1
  }
}

function isHighlighted(participantId) {
  if (!searchName.value) return false
  return getParticipantName(participantId).includes(searchName.value)
}

onMounted(() => {
  fetchEvents()
})
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #4CAF50;
  color: white;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #ddd;
}

select, input {
  margin-bottom: 20px;
  padding: 8px;
  font-size: 1em;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  padding: 8px 16px;
  margin: 0 5px;
  font-size: 1em;
}

.pagination span {
  font-size: 1.2em;
}

.highlight {
  background-color: yellow;
}
</style>
