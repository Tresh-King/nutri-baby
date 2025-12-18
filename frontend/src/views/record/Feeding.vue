<template>
  <div class="feeding-page">
    <div class="page-header">
      <el-button link :icon="Back" @click="router.back()">Back</el-button>
      <h2>Feeding Record</h2>
    </div>

    <el-card class="form-card">
      <el-tabs v-model="feedingType" class="feeding-tabs">
        <el-tab-pane label="Breast" name="breast">
          <template #label><span class="tab-label">🤱 Breast</span></template>
        </el-tab-pane>
        <el-tab-pane label="Bottle" name="bottle">
           <template #label><span class="tab-label">🍼 Bottle</span></template>
        </el-tab-pane>
        <el-tab-pane label="Solids" name="food">
           <template #label><span class="tab-label">🥣 Solids</span></template>
        </el-tab-pane>
      </el-tabs>

      <el-form label-position="top" class="record-form">
        
        <!-- Breast Feeding -->
        <div v-if="feedingType === 'breast'">
           <el-form-item label="Side">
             <el-radio-group v-model="breastForm.side" size="large">
               <el-radio-button label="left">Left</el-radio-button>
               <el-radio-button label="right">Right</el-radio-button>
               <el-radio-button label="both">Both</el-radio-button>
             </el-radio-group>
           </el-form-item>

           <!-- Timer Section -->
           <div class="timer-section">
              <div class="timer-display">{{ formattedTime }}</div>
              <div class="timer-controls">
                <el-button 
                  v-if="!timerRunning" 
                  type="primary" 
                  size="large" 
                  circle 
                  :icon="VideoPlay"
                  class="timer-btn play-btn"
                  @click="startTimer" 
                />
                <el-button 
                  v-else 
                  type="danger" 
                  size="large" 
                  circle 
                  :icon="VideoPause" 
                  class="timer-btn pause-btn"
                  @click="stopTimer" 
                />
              </div>
              <div class="timer-status">{{ timerRunning ? 'Recording...' : 'Ready' }}</div>
           </div>

           <el-row :gutter="20">
             <el-col :span="12">
               <el-form-item label="Left (min)">
                 <el-input-number v-model="breastForm.leftDuration" :min="0" :step="1" />
               </el-form-item>
             </el-col>
             <el-col :span="12">
               <el-form-item label="Right (min)">
                 <el-input-number v-model="breastForm.rightDuration" :min="0" :step="1" />
               </el-form-item>
             </el-col>
           </el-row>
        </div>

        <!-- Bottle Feeding -->
        <div v-if="feedingType === 'bottle'">
          <el-form-item label="Milk Type">
            <el-radio-group v-model="bottleForm.type">
              <el-radio label="formula">Formula</el-radio>
              <el-radio label="breast-milk">Breast Milk</el-radio>
            </el-radio-group>
          </el-form-item>
          
          <el-form-item label="Amount">
             <el-input v-model.number="bottleForm.amount" type="number" placeholder="Amount">
                <template #append>
                   <el-select v-model="bottleForm.unit" style="width: 70px">
                     <el-option label="ml" value="ml" />
                     <el-option label="oz" value="oz" />
                   </el-select>
                </template>
             </el-input>
          </el-form-item>
        </div>

        <!-- Solids -->
         <div v-if="feedingType === 'food'">
           <el-form-item label="Food Name">
             <el-input v-model="foodForm.name" placeholder="e.g. Cereal, Apple Puree" />
           </el-form-item>
           <el-form-item label="Note">
             <el-input v-model="foodForm.note" type="textarea" :rows="3" placeholder="Baby's reaction..." />
           </el-form-item>
         </div>

        <el-divider />

        <el-form-item label="Time">
          <el-date-picker
            v-model="recordTime"
            type="datetime"
            placeholder="Select date and time"
            style="width: 100%"
          />
        </el-form-item>
        
        <el-button type="primary" size="large" class="submit-btn" @click="saveRecord">Save Record</el-button>
      </el-form>

    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { Back, VideoPlay, VideoPause } from '@element-plus/icons-vue'
import { useRecordStore } from '@/stores/record'
import { useBabyStore } from '@/stores/baby'
import { ElMessage } from 'element-plus'

const router = useRouter()
const recordStore = useRecordStore()
const babyStore = useBabyStore()

const feedingType = ref<'breast' | 'bottle' | 'food'>('breast')
const recordTime = ref(new Date())

// Breast Form
const breastForm = reactive({
  side: 'left' as 'left' | 'right' | 'both',
  leftDuration: 0,
  rightDuration: 0
})

// Timer Logic
const timerRunning = ref(false)
const startTime = ref(0)
const elapsedSeconds = ref(0)
let timerInterval: number | null = null

const formattedTime = computed(() => {
  const m = Math.floor(elapsedSeconds.value / 60).toString().padStart(2, '0')
  const s = (elapsedSeconds.value % 60).toString().padStart(2, '0')
  return `${m}:${s}`
})

const startTimer = () => {
  if (timerRunning.value) return
  startTime.value = Date.now() - (elapsedSeconds.value * 1000)
  timerRunning.value = true
  timerInterval = window.setInterval(() => {
    elapsedSeconds.value = Math.floor((Date.now() - startTime.value) / 1000)
  }, 1000)
}

const stopTimer = () => {
  if (!timerRunning.value) return
  if (timerInterval) {
     clearInterval(timerInterval)
     timerInterval = null
  }
  timerRunning.value = false
  
  // Distribute time
  const minutes = Math.ceil(elapsedSeconds.value / 60)
  if (breastForm.side === 'left') breastForm.leftDuration += minutes
  else if (breastForm.side === 'right') breastForm.rightDuration += minutes
  else {
    const half = Math.ceil(minutes / 2)
    breastForm.leftDuration += half
    breastForm.rightDuration += half
  }
  
  // Reset timer display for next session (optional, or keep it?)
  // keeping it allows user to see what they just recorded
}

onUnmounted(() => {
   if (timerInterval) clearInterval(timerInterval)
})

// Bottle Form
const bottleForm = reactive({
  type: 'formula',
  amount: 60,
  unit: 'ml'
})

// Food Form
const foodForm = reactive({
  name: '',
  note: ''
})

const saveRecord = () => {
  if (!babyStore.currentBaby) {
    ElMessage.error('No baby selected')
    return
  }

  const record: any = {
    babyId: babyStore.currentBaby.babyId,
    type: feedingType.value,
    startTime: recordTime.value.getTime(),
    detail: {}
  }

  if (feedingType.value === 'breast') {
    if (breastForm.leftDuration === 0 && breastForm.rightDuration === 0) {
       ElMessage.warning('Please record duration')
       return
    }
    record.detail = { ...breastForm }
  } else if (feedingType.value === 'bottle') {
    record.detail = { ...bottleForm }
  } else {
    if (!foodForm.name) {
       ElMessage.warning('Please enter food name')
       return
    }
    record.detail = { ...foodForm }
  }

  recordStore.addRecord(record)
  ElMessage.success('Saved successfully')
  router.back()
}
</script>

<style scoped lang="scss">
.feeding-page {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}
.page-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  h2 { margin-left: 10px; }
}
.tab-label {
    font-size: 16px;
    display: flex;
    align-items: center;
    gap: 5px;
}
.record-form {
    margin-top: 20px;
}
.timer-section {
    text-align: center;
    margin: 30px 0;
    padding: 20px;
    background: var(--el-fill-color-light);
    border-radius: 12px;
}
.timer-display {
    font-size: 48px;
    font-family: monospace;
    font-weight: bold;
    color: var(--el-text-color-primary);
    margin-bottom: 20px;
}
.timer-btn {
    width: 64px;
    height: 64px;
    font-size: 32px;
}
.timer-status {
    margin-top: 10px;
    color: var(--el-text-color-secondary);
    font-size: 14px;
}
.submit-btn {
    width: 100%;
    margin-top: 20px;
}
</style>
