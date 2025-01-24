import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import AdminLoginPage from '../pages/AdminLoginPage.vue'
import AdminDashboard from '../components/AdminDashboard.vue'
import ParticipantManagementPage from '../pages/ParticipantManagementPage.vue'
import ParticipantRecordForm from '../pages/ParticipantRecordForm.vue'
import RankingPage from '../pages/RankingPage.vue'
import EventManagementPage from '../pages/EventManagementPage.vue'
import ClubManagementPage from '../pages/ClubManagementPage.vue'
import TournamentManagementPage from '../pages/TournamentManagementPage.vue'
// import TournamentManagementPage from '../components/TournamentManagementPage.vue'
// import EventManagementPage from '../components/EventManagementPage.vue'
// import ErrorPage from '../components/ErrorPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/login', component: AdminLoginPage },
  { path: '/dashboard', component: AdminDashboard },
  { path: '/dashboard/participants', component: ParticipantManagementPage },
  { path: '/dashboard/participant-records', component: ParticipantRecordForm },
  { path: '/ranking', component: RankingPage },
  { path: '/dashboard/events', component: EventManagementPage },
  { path: '/dashboard/clubs', component: ClubManagementPage },
  { path: '/dashboard/tournaments', component: TournamentManagementPage },
//   { path: '/dashboard/tournaments', component: TournamentManagementPage },
//   { path: '/dashboard/events', component: EventManagementPage },
//   { path: '/error', component: ErrorPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
