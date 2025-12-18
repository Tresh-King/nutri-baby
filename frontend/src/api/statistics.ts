import axios from 'axios'

const api = axios.create({
    baseURL: '/api'
})

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export const getStatistics = async (babyId: string) => {
    const response = await api.get('/statistics', { params: { babyId } })
    return response.data
}

export const getGrowthStandards = async (type: string, gender: string) => {
    // type: height, weight
    // gender: male, female
    const response = await api.get('/standards/growth', { params: { type, gender } })
    return response.data
}
