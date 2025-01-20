<template>
    <div>
        <h2>参加者記録登録</h2>
        <ul>
            <li><router-link to="/dashboard">ダッシュボード</router-link></li>
        </ul>
        <form @submit.prevent="addRecord">
            <div>
                <label for="participantId">参加者ID:</label>
                <select id="participantId" v-model="participantId" required>
                    <option v-for="participant in participants" :key="participant.id" :value="participant.id">
                        {{ participant.name }}
                    </option>
                </select>
            </div>
            <div>
                <label for="tournamentId">大会ID:</label>
                <input type="text" id="tournamentId" v-model="tournamentId" required />
            </div>
            <div>
                <label for="eventId">種目ID:</label>
                <select id="eventId" v-model="eventId" required>
                    <option v-for="event in events" :key="event.id" :value="event.id">
                        {{ event.name }}
                    </option>
                </select>
            </div>
            <div>
                <label for="score">スコア:</label>
                <input type="number" id="score" v-model="score" required />
            </div>
            <button type="submit">登録</button>
        </form>

        <h2>登録済み記録一覧</h2>
        <ul>
            <li v-for="record in records" :key="record.id">
                {{ record.participantName }} - {{ record.eventName }} - {{ record.score }}
                <button @click="confirmDelete(record.id)">削除</button>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRecordStore } from '../stores/recordStore'
import { useParticipantStore } from '../stores/participantStore'
import { useEventStore } from '../stores/eventStore'

const participantId = ref('')
const tournamentId = ref('')
const eventId = ref('')
const score = ref('')

const recordStore = useRecordStore()
const records = ref([])

const participantStore = useParticipantStore()
const participants = ref([])

const eventStore = useEventStore()
const events = ref([])

const addRecord = async () => {
  const record = {
    participantId: participantId.value,
    tournamentId: tournamentId.value,
    eventId: eventId.value,
    score: score.value,
    timestamp: new Date().toISOString()
  }
  await recordStore.addRecord(record)
  console.log('記録情報が登録されました:', record)
  fetchRecords()
}

const fetchRecords = async () => {
  await recordStore.fetchRecords()
  records.value = recordStore.records.map(record => ({
    ...record,
    participantName: participants.value.find(p => p.id === record.participantId)?.name || 'Unknown',
    eventName: events.value.find(e => e.id === record.eventId)?.name || 'Unknown'
  }))
}

const fetchParticipants = async () => {
  await participantStore.fetchParticipants()
  participants.value = participantStore.participants
}

const fetchEvents = async () => {
  await eventStore.fetchEvents()
  events.value = eventStore.events
}

const confirmDelete = (id) => {
  if (confirm('本当に削除しますか？')) {
    deleteRecord(id)
  }
}

const deleteRecord = async (id) => {
  await recordStore.deleteRecord(id)
  fetchRecords()
}

onMounted(() => {
  fetchRecords()
  fetchParticipants()
  fetchEvents()
})
</script>

<style scoped>
/* 必要に応じてスタイルを追加 */
form div {
  margin-bottom: 10px;
}
</style>
