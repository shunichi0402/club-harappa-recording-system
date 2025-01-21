<template>
    <div>
        <h1>参加者管理</h1>
        <ul>
            <li><router-link to="/dashboard">ダッシュボード</router-link></li>
        </ul>

        <form @submit.prevent="addParticipant">
            <div>
                <label for="name">氏名:</label>
                <input type="text" id="name" v-model="name" required />
            </div>
            <div>
                <label for="address">住所:</label>
                <input type="text" id="address" v-model="address" required />
            </div>
            <div>
                <label for="age">年齢:</label>
                <input type="number" id="age" v-model="age" required />
            </div>
            <div>
                <label for="phone">電話番号:</label>
                <input type="tel" id="phone" v-model="phone" required />
            </div>
            <div>
                <label for="email">メールアドレス:</label>
                <input type="email" id="email" v-model="email" required />
            </div>
            <div>
                <label for="clubId">所属クラブID:</label>
                <input type="text" id="clubId" v-model="clubId" required />
            </div>
            <button type="submit">登録</button>
        </form>
        <p v-if="message">{{ message }}</p>

        <h2>登録済み参加者一覧</h2>
        <ul>
            <li v-for="participant in participants" :key="participant.id">
                {{ participant.name }} - {{ participant.email }}
                <button @click="confirmDelete(participant.id)">削除</button>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useParticipantStore } from '../stores/participantStore'

const name = ref('')
const address = ref('')
const age = ref('')
const phone = ref('')
const email = ref('')
const clubId = ref('')
const message = ref('')

const participantStore = useParticipantStore()
const participants = ref([])

const addParticipant = async () => {
    const participant = {
        name: name.value,
        address: address.value,
        age: age.value,
        phone: phone.value,
        email: email.value,
        clubId: clubId.value,
    }
    await participantStore.addParticipant(participant)
    message.value = '参加者情報が登録されました'
    resetForm()
    fetchParticipants()
}

const resetForm = () => {
    name.value = ''
    address.value = ''
    age.value = ''
    phone.value = ''
    email.value = ''
    clubId.value = ''
}

const fetchParticipants = async () => {
    await participantStore.fetchParticipants()
    participants.value = participantStore.participants
}

const confirmDelete = (id) => {
    if (confirm('本当に削除しますか？')) {
        deleteParticipant(id)
    }
}

const deleteParticipant = async (id) => {
    await participantStore.deleteParticipant(id)
    fetchParticipants()
}

onMounted(() => {
    fetchParticipants()
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

form input {
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
