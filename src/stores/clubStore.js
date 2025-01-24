import { defineStore } from 'pinia'
import { db } from '../firebaseSetup'
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore'

export const useClubStore = defineStore('club', {
  state: () => ({
    clubs: []
  }),
  actions: {
    async fetchClubs() {
      const querySnapshot = await getDocs(collection(db, 'clubs'))
      this.clubs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    },
    async addClub(club) {
      await addDoc(collection(db, 'clubs'), club)
      this.fetchClubs()
    },
    async deleteClub(id) {
      await deleteDoc(doc(db, 'clubs', id))
      this.fetchClubs()
    }
  }
})
