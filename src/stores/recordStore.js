import { defineStore } from 'pinia'
import { db } from '../firebaseSetup'
import { collection, addDoc, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore'
import { useParticipantStore } from './participantStore'
import { useEventStore } from './eventStore'

export const useRecordStore = defineStore('record', {
  state: () => ({
    records: []
  }),
  actions: {
    async fetchRecords() {
      const participantStore = useParticipantStore()
      const eventStore = useEventStore()
      await participantStore.fetchParticipants()
      await eventStore.fetchEvents()
      const participants = participantStore.participants
      const events = eventStore.events

      const querySnapshot = await getDocs(collection(db, 'records'))
      this.records = querySnapshot.docs.map(doc => {
        const data = doc.data()
        return {
          id: doc.id,
          ...data,
          participantName: participants.find(p => p.id === data.participantId)?.name || 'Unknown',
          eventName: events.find(e => e.id === data.eventId)?.name || 'Unknown'
        }
      })
    },
    async fetchRecordsByEventId(eventId) {
      const participantStore = useParticipantStore()
      const eventStore = useEventStore()
      await participantStore.fetchParticipants()
      await eventStore.fetchEvents()
      const participants = participantStore.participants
      const events = eventStore.events

      const q = query(collection(db, 'records'), where('eventId', '==', eventId))
      const querySnapshot = await getDocs(q)
      this.records = querySnapshot.docs.map(doc => {
        const data = doc.data()
        return {
          id: doc.id,
          ...data,
          participantName: participants.find(p => p.id === data.participantId)?.name || 'Unknown',
          eventName: events.find(e => e.id === data.eventId)?.name || 'Unknown'
        }
      }).sort((a, b) => b.score - a.score)
    },
    async addRecord(record) {
      await addDoc(collection(db, 'records'), record)
      this.fetchRecords()
    },
    async deleteRecord(id) {
      await deleteDoc(doc(db, 'records', id))
      this.fetchRecords()
    }
  }
})
