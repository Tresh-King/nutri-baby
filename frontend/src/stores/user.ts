import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as authApi from '@/api/auth'

export const useUserStore = defineStore('user', () => {
    const isLoggedIn = ref(true)
    const userInfo = ref({
        id: 'u1',
        nickname: 'Test Parent',
        avatar: ''
    })

    const login = async (code: string) => {
        try {
            const data = await authApi.login(code)
            setSession(data)
        } catch (error) {
            console.error('Login failed', error)
            throw error
        }
    }

    const loginCredential = async (phone: string, pass: string) => {
        const data = await authApi.loginCredential({ phone, password: pass })
        setSession(data)
    }

    const register = async (phone: string, pass: string, nickname: string) => {
        const data = await authApi.register({ phone, password: pass, nickname })
        setSession(data)
    }

    const setSession = (data: any) => {
        isLoggedIn.value = true
        userInfo.value = {
            id: data.userInfo.id,
            nickname: data.userInfo.nickname || 'Parent',
            avatar: data.userInfo.avatarUrl || ''
        }
        localStorage.setItem('token', data.token)
    }

    const logout = () => {
        isLoggedIn.value = false
        userInfo.value = { id: '', nickname: '', avatar: '' }
        localStorage.removeItem('token')
    }

    return {
        isLoggedIn,
        userInfo,
        login,
        loginCredential,
        register,
        logout
    }
})
