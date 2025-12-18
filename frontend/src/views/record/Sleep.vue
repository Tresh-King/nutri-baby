<template>
  <div class="sleep-page">
    <div class="page-header">
      <el-button link :icon="Back" @click="router.back()">Back</el-button>
      <h2>Sleep Record</h2>
    </div>

    <el-card class="status-card" :class="{ 'is-sleeping': isSleeping }">
       <div class="status-content">
          <div class="icon">{{ isSleeping ? '💤' : '👀' }}</div>
          <div class="text">
             <h3>{{ isSleeping ? 'Baby is Sleeping' : 'Baby is Awake' }}</h3>
             <p v-if="isSleeping">{{ formattedDuration }}</p>
             <p v-else>Tap below to start sleep</p>
          </div>
       </div>
    </el-card>

    <div v-if="!isSleeping" class="action-section">
       <el-form label-position="top">
         <el-form-item label="Sleep Type">
           <el-radio-group v-model="sleepType" size="large">
             <el-radio-button label="nap">Nap</el-radio-button>
             <el-radio-button label="night">Night Sleep</el-radio-button>
           </el-radio-group>
         </el-form-item>
         
         <el-button type="primary" size="large" class="action-btn" @click="startSleep">
           Start Sleeping
         </el-button>
         
         <el-divider>OR</el-divider>
         
         <el-button size="large" class="action-btn" @click="showManual = true">
           Log Past Sleep
         </el-button>
       </el-form>
    </div>

    <div v-else class="action-section">
       <el-button type="success" size="large" class="action-btn" @click="endSleep">
         Wake Up
       </el-button>
    </div>
    
    <!-- Manual Entry Dialog -->
    <el-dialog v-model="showManual" title="Log Past Sleep" width="90%">
       <el-form label-position="top">
          <el-form-item label="Type">
             <el-radio-group v-model="manualForm.type">
               <el-radio-button label="nap">Nap</el-radio-button>
               <el-radio-button label="night">Night</el-radio-button>
             </el-radio-group>
          </el-form-item>
          <el-form-item label="Start Time">
             <el-date-picker v-model="manualForm.startTime" type="datetime" style="width: 100%" />
          </el-form-item>
          <el-form-item label="End Time">
             <el-date-picker v-model="manualForm.endTime" type="datetime" style="width: 100%" />
          </el-form-item>
       </el-form>
       <template #footer>
          <el-button @click="showManual = false">Cancel</el-button>
          <el-button type="primary" @click="saveManual">Save</el-button>
       </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Back } from '@element-plus/icons-vue'
import { useRecordStore } from '@/stores/record'
import { useBabyStore } from '@/stores/baby'
import { ElMessage } from 'element-plus'

const router = useRouter()
const recordStore = useRecordStore()
const babyStore = useBabyStore()

const isSleeping = ref(false)
const sleepType = ref<'nap' | 'night'>('nap')
const startTime = ref(0)
const elapsedSeconds = ref(0)
let timerInterval: number | null = null

const formattedDuration = computed(() => {
  const h = Math.floor(elapsedSeconds.value / 3600).toString().padStart(2, '0')
  const m = Math.floor((elapsedSeconds.value % 3600) / 60).toString().padStart(2, '0')
  const s = (elapsedSeconds.value % 60).toString().padStart(2, '0')
  return `${h}:${m}:${s}`
})

const startSleep = () => {
   isSleeping.value = true
   startTime.value = Date.now()
   timerInterval = window.setInterval(() => {
     elapsedSeconds.value = Math.floor((Date.now() - startTime.value) / 1000)
   }, 1000)
}

const endSleep = () => {
   if (!babyStore.currentBaby) return
   
   clearInterval(timerInterval!)
   timerInterval = null
   isSleeping.value = false
   
   recordStore.addRecord({
     babyId: babyStore.currentBaby.babyId,
     type: 'sleep',
     startTime: startTime.value,
     endTime: Date.now(),
     detail: {
       sleepType: sleepType.value
     }
   })
   
   ElMessage.success('Sleep recorded')
   router.back()
}

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval)
})

// Manual Entry
const showManual = ref(false)
const manualForm = reactive({
  type: 'nap',
  startTime: new Date(),
  endTime: new Date()
})

const saveManual = () => {
  if (!babyStore.currentBaby) return
  
  if (manualForm.startTime >= manualForm.endTime) {
     ElMessage.warning('End time must be after start time')
     return
  }
  
  recordStore.addRecord({
     babyId: babyStore.currentBaby.babyId,
     type: 'sleep',
     startTime: manualForm.startTime.getTime(),
     endTime: manualForm.endTime.getTime(),
     detail: {
       sleepType: manualForm.type as 'nap' | 'night'
     }
  })
  showManual.value = false
  ElMessage.success('Recorded successfully')
  router.back()
}
</script>

<style scoped lang="scss">
.sleep-page {
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

.status-card {
  margin-bottom: 30px;
  text-align: center;
  transition: all 0.3s;
  
  &.is-sleeping {
    background-color: var(--el-color-primary-light-9);
    border-color: var(--el-color-primary);
  }
  
  .icon { font-size: 60px; margin-bottom: 10px; }
  h3 { margin: 0; font-size: 24px; }
  p { font-size: 18px; color: var(--el-text-color-secondary); margin-top: 5px; }
}

.action-btn {
  width: 100%;
  margin-bottom: 10px;
}
</style>
