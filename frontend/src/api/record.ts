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

// Unified Record Interface (Frontend)
export interface ApiRecordPayload {
    babyId: string
    time?: number
    startTime?: number
    endTime?: number
    type?: string
    [key: string]: any
}

// Feeding
export const createFeedingRecord = async (data: ApiRecordPayload) => {
    return (await api.post('/feeding-records', data)).data
}
export const getFeedingRecords = async (babyId: string, startTime?: number, endTime?: number) => {
    return (await api.get('/feeding-records', { params: { babyId, startTime, endTime } })).data
}

// Sleep
export const createSleepRecord = async (data: ApiRecordPayload) => {
    return (await api.post('/sleep-records', data)).data
}
export const getSleepRecords = async (babyId: string, startTime?: number, endTime?: number) => {
    return (await api.get('/sleep-records', { params: { babyId, startTime, endTime } })).data
}

// Diaper
export const createDiaperRecord = async (data: ApiRecordPayload) => {
    return (await api.post('/diaper-records', data)).data
}
export const getDiaperRecords = async (babyId: string, startTime?: number, endTime?: number) => {
    return (await api.get('/diaper-records', { params: { babyId, startTime, endTime } })).data
}

// Growth
export const createGrowthRecord = async (data: ApiRecordPayload) => {
    return (await api.post('/growth-records', data)).data
}
export const getGrowthRecords = async (babyId: string, startTime?: number, endTime?: number) => {
    return (await api.get('/growth-records', { params: { babyId, startTime, endTime } })).data
}
