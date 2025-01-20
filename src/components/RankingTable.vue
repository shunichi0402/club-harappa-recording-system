<template>
  <div>
    <h2>{{ eventName }}のランキング</h2>
    <select v-model="selectedEventId" @change="fetchRankings">
      <option v-for="event in events" :key="event.id" :value="event.id">{{ event.name }}</option>
    </select>
    <table>
      <thead>
        <tr>
          <th>順位</th>
          <th>参加者名</th>
          <th>スコア</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(record, index) in rankings" :key="record.id">
          <td>{{ index + 1 }}</td>
          <td>{{ getParticipantName(record.participantId) }}</td>
          <td>{{ record.score }}</td>
        </tr>
      </tbody>
    </table>
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
}

function getParticipantName(participantId) {
  const participant = participantStore.participants.find(p => p.id === participantId)
  return participant ? participant.name : '不明'
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

select {
  margin-bottom: 20px;
  padding: 8px;
  font-size: 1em;
}
</style>
