import { defineStore } from 'pinia'
import { db } from '../firebaseSetup'
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore'

export const useTournamentStore = defineStore('tournament', {
  state: () => ({
    tournaments: []
  }),
  actions: {
    async fetchTournaments() {
      const querySnapshot = await getDocs(collection(db, 'tournaments'))
      this.tournaments = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    },
    async addTournament(tournament) {
      await addDoc(collection(db, 'tournaments'), tournament)
      this.fetchTournaments()
    },
    async deleteTournament(id) {
      await deleteDoc(doc(db, 'tournaments', id))
      this.fetchTournaments()
    }
  }
})
