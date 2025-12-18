import axios from 'axios'
import type { BabyProfile } from '@/stores/baby'

const api = axios.create({
    baseURL: '/api'
})

// Interceptor to add token
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export const getBabies = async () => {
    const response = await api.get<BabyProfile[]>('/baby')
    return response.data
}

export const createBaby = async (baby: Partial<BabyProfile>) => {
    const response = await api.post<BabyProfile>('/baby', baby)
    return response.data
}

export const updateBaby = async (id: string, updates: Partial<BabyProfile>) => {
    const response = await api.put<BabyProfile>(`/baby/${id}`, updates)
    return response.data
}

export const deleteBaby = async (id: string) => {
    await api.delete(`/baby/${id}`)
}
