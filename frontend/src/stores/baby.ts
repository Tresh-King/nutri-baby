import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as babyApi from '@/api/baby'

export interface BabyProfile {
    babyId: string
    name: string
    nickname?: string
    gender: 'male' | 'female'
    birthDate: string
    avatarUrl?: string
    isDefault?: boolean
    id?: string // Backend ID
}

export const useBabyStore = defineStore('baby', () => {
    // Mock Initial Data (Replaced by API)
    const babyList = ref<BabyProfile[]>([])
    const currentBaby = ref<BabyProfile | null>(null)

    // Initial loading
    const loadBabies = async () => {
        try {
            babyList.value = await babyApi.getBabies()
            // Set default: find one marked as default, or first one
            let defaultBaby = babyList.value.find(b => b.isDefault)
            if (!defaultBaby && babyList.value.length > 0) {
                defaultBaby = babyList.value[0]
            }
            if (defaultBaby) {
                currentBaby.value = defaultBaby
            }
        } catch (error) {
            console.error('Failed to load babies', error)
        }
    }

    const setCurrentBaby = (id: string) => {
        const baby = babyList.value.find(b => b.babyId === id)
        if (baby) {
            currentBaby.value = baby
        }
    }

    const addBaby = async (baby: Omit<BabyProfile, 'babyId'>) => {
        try {
            const newBaby = await babyApi.createBaby(baby)
            // Ensure ID is string
            newBaby.babyId = String(newBaby.id || newBaby.babyId)
            babyList.value.push(newBaby)
            if (!currentBaby.value) {
                currentBaby.value = newBaby
            }
            return newBaby
        } catch (error) {
            console.error('Add baby failed', error)
            throw error
        }
    }

    const updateBaby = async (id: string, updates: Partial<BabyProfile>) => {
        try {
            const updatedBaby = await babyApi.updateBaby(id, updates)
            updatedBaby.babyId = String(updatedBaby.id || updatedBaby.babyId)

            const index = babyList.value.findIndex(b => b.babyId === id)
            if (index !== -1) {
                babyList.value[index] = updatedBaby
                if (currentBaby.value?.babyId === id) {
                    currentBaby.value = updatedBaby
                }
            }
        } catch (error) {
            console.error('Update baby failed', error)
            throw error
        }
    }

    const deleteBaby = async (id: string) => {
        try {
            await babyApi.deleteBaby(id)
            babyList.value = babyList.value.filter(b => b.babyId !== id)
            if (currentBaby.value && currentBaby.value.babyId === id) {
                currentBaby.value = babyList.value[0] || null
            }
        } catch (error) {
            console.error('Delete baby failed', error)
            throw error
        }
    }

    return {
        babyList,
        currentBaby,
        loadBabies,
        setCurrentBaby,
        addBaby,
        updateBaby,
        deleteBaby
    }
})
