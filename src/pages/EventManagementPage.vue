<template>
    <div>
        <h1>種目管理</h1>
        <ul>
            <li><router-link to="/dashboard">ダッシュボード</router-link></li>
        </ul>

        <form @submit.prevent="addEvent">
            <div>
                <label for="name">種目名:</label>
                <input type="text" id="name" v-model="name" required />
            </div>
            <div>
                <label for="description">種目説明:</label>
                <input type="text" id="description" v-model="description" required />
            </div>
            <button type="submit">登録</button>
        </form>
        <p v-if="message">{{ message }}</p>

        <h2>登録済み種目一覧</h2>
        <ul>
            <li v-for="event in events" :key="event.id">
                {{ event.name }} - {{ event.description }}
                <button @click="confirmDelete(event.id)">削除</button>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useEventStore } from '../stores/eventStore'

const name = ref('')
const description = ref('')
const message = ref('')

const eventStore = useEventStore()
const events = ref([])

const addEvent = async () => {
    const event = {
        name: name.value,
        description: description.value,
    }
    await eventStore.addEvent(event)
    message.value = '種目が登録されました'
    resetForm()
    fetchEvents()
}

const resetForm = () => {
    name.value = ''
    description.value = ''
}

const fetchEvents = async () => {
    await eventStore.fetchEvents()
    events.value = eventStore.events
}

const confirmDelete = (id) => {
    if (confirm('本当に削除しますか？')) {
        deleteEvent(id)
    }
}

const deleteEvent = async (id) => {
    await eventStore.deleteEvent(id)
    fetchEvents()
}

onMounted(() => {
    fetchEvents()
})
</script>

<style scoped>
/* 必要に応じてスタイルを追加 */
form div {
    margin-bottom: 10px;
}
</style>
