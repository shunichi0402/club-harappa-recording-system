import { defineStore } from 'pinia'
import { ref } from 'vue'
import { auth } from '../firebaseSetup'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
    const email = ref('')
    const password = ref('')
    const user = ref(null)
    const router = useRouter()

    const login = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
            user.value = userCredential.user
            router.push('/dashboard')
        } catch (error) {
            alert('ログインに失敗しました。')
        }
    }

    const logout = async () => {
        try {
            await signOut(auth)
            user.value = null
            router.push('/')
        } catch (error) {
            alert('ログアウトに失敗しました。')
        }
    }

    return { email, password, user, login, logout }
})
