import { defineStore } from 'pinia'
import { db } from '../firebaseSetup'
import { collection, addDoc, getDocs, deleteDoc, doc, where, query } from 'firebase/firestore'

export const useParticipantStore = defineStore('participant', {
  state: () => ({
    participants: [],
    participantsByIds: []
  }),
  actions: {
    async fetchParticipants() {
      const querySnapshot = await getDocs(collection(db, 'participants'))
      this.participants = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    },
    async fetchParticipantsByIds(ids) {
      const q = query(collection(db, 'participants'), where('id', 'in', ids))
      const querySnapshot = await getDocs(q)
      this.participantsByIds = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    },
    async addParticipant(participant) {
      await addDoc(collection(db, 'participants'), participant)
      this.fetchParticipants()
    },
    async deleteParticipant(id) {
      await deleteDoc(doc(db, 'participants', id))
      this.fetchParticipants()
    }
  }
})
