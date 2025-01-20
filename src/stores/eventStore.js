import { defineStore } from 'pinia'
import { db } from '../firebaseSetup'
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore'

export const useEventStore = defineStore('event', {
  state: () => ({
    events: []
  }),
  actions: {
    async fetchEvents() {
      const querySnapshot = await getDocs(collection(db, 'events'))
      this.events = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    },
    async addEvent(event) {
      await addDoc(collection(db, 'events'), event)
      this.fetchEvents()
    },
    async deleteEvent(id) {
      await deleteDoc(doc(db, 'events', id))
      this.fetchEvents()
    }
  }
})
