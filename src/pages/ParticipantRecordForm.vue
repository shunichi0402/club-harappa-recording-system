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
                <select id="tournamentId" v-model="tournamentId" required>
                    <option v-for="tournament in tournaments" :key="tournament.id" :value="tournament.id">
                        {{ tournament.name }}
                    </option>
                </select>
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
import { useTournamentStore } from '../stores/tournamentStore'

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

const tournamentStore = useTournamentStore()
const tournaments = ref([])

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

const fetchTournaments = async () => {
  await tournamentStore.fetchTournaments()
  tournaments.value = tournamentStore.tournaments
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
  fetchTournaments()
})
</script>

<style scoped>
/* 必要に応じてスタイルを追加 */
form div {
  margin-bottom: 10px;
}

form {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

form label {
  font-weight: bold;
}

form input, form select {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

ul {
  list-style-type: none;
  padding: 0;
}

ul li {
  background-color: #f9f9f9;
  margin: 5px 0;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

ul li button {
  background-color: #ff4d4d;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

ul li button:hover {
  background-color: #ff1a1a;
}
</style>
