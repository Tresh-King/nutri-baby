import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as recordApi from '@/api/record'

export interface BabyRecord {
    id: string
    babyId: string
    type: 'breast' | 'bottle' | 'food' | 'sleep' | 'diaper'
    startTime: number
    endTime?: number
    detail: {
        // Breast
        side?: 'left' | 'right' | 'both'
        leftDuration?: number // seconds
        rightDuration?: number // seconds

        // Bottle
        bottleType?: 'formula' | 'breast-milk'
        amount?: number
        unit?: 'ml' | 'oz'

        // Food
        foodName?: string
        note?: string

        // Sleep
        sleepType?: 'nap' | 'night'

        // Diaper
        diaperType?: 'pee' | 'poop' | 'both'
        poopColor?: string
        poopTexture?: string
    }
}

export const useRecordStore = defineStore('record', () => {
    // Single list for all records
    const records = ref<BabyRecord[]>([])

    const addRecord = async (record: Omit<BabyRecord, 'id'>) => {
        try {
            let result;
            const payload: any = {
                babyId: record.babyId,
                time: record.startTime,
                startTime: record.startTime,
                endTime: record.endTime,
                type: record.type,
                ...record.detail
            }

            // Map types to specific API calls
            if (record.type === 'breast' || record.type === 'bottle' || record.type === 'food') {
                payload.feedingType = record.type // feeding specific
                result = await recordApi.createFeedingRecord(payload)
            } else if (record.type === 'sleep') {
                result = await recordApi.createSleepRecord(payload)
            } else if (record.type === 'diaper') {
                payload.type = (record.detail as any).diaperType // override top level type 'diaper' with subtype 'pee/poop'
                result = await recordApi.createDiaperRecord(payload)
            } else if (record.type === 'growth') { // if growth added to BabyRecord type
                result = await recordApi.createGrowthRecord(payload)
            }

            if (result) {
                // Map result back to BabyRecord format if needed, or just push generic result
                // For now, assume result has ID and push lightweight version or reload
                const newRecord = { ...record, id: String(result.id) }
                records.value.unshift(newRecord)
                return newRecord
            }
        } catch (error) {
            console.error('Failed to add record', error)
            throw error
        }
    }

    const getRecords = async (babyId: string) => {
        // Load all types for timeline? Or lazy load?
        // Basic implementation: load feedings for now as proof of concept
        try {
            // Parallel fetch
            const [feedings, sleeps, diapers] = await Promise.all([
                recordApi.getFeedingRecords(babyId),
                recordApi.getSleepRecords(babyId),
                recordApi.getDiaperRecords(babyId)
            ])

            // Merge and sort
            // This logic ideally belongs in a unified timeline API on backend
            // But doing it here for speed

            const merged = [
                ...(feedings.records || []).map((r: any) => ({
                    id: String(r.id),
                    babyId: String(r.babyId),
                    type: r.feedingType,
                    startTime: new Date(r.time).getTime(),
                    detail: r.detail || r // mix
                })),
                ...(sleeps.records || []).map((r: any) => ({
                    id: String(r.id),
                    babyId: String(r.babyId),
                    type: 'sleep',
                    startTime: new Date(r.startTime).getTime(),
                    endTime: r.endTime ? new Date(r.endTime).getTime() : undefined,
                    detail: { sleepType: r.type, duration: r.duration }
                })),
                ...(diapers.records || []).map((r: any) => ({
                    id: String(r.id),
                    babyId: String(r.babyId),
                    type: 'diaper',
                    startTime: new Date(r.time).getTime(),
                    detail: { diaperType: r.type, poopColor: r.poopColor }
                }))
            ]

            records.value = merged.sort((a, b) => b.startTime - a.startTime)

        } catch (e) {
            console.error(e)
        }
    }

    return {
        records,
        addRecord,
        getRecords
    }
})
