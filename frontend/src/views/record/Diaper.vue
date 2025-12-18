<template>
  <div class="diaper-page">
    <div class="page-header">
      <el-button link :icon="Back" @click="router.back()">Back</el-button>
      <h2>Diaper Change</h2>
    </div>

    <el-card class="form-card">
       <el-form label-position="top">
          <el-form-item label="Type">
             <div class="type-selector">
                <el-radio-group v-model="form.type" size="large">
                   <el-radio-button label="pee">💧 Pee</el-radio-button>
                   <el-radio-button label="poop">💩 Poop</el-radio-button>
                   <el-radio-button label="both">Both</el-radio-button>
                </el-radio-group>
             </div>
          </el-form-item>
          
          <div v-if="form.type !== 'pee'">
             <el-form-item label="Color">
                <div class="color-grid">
                   <div 
                     v-for="color in colors" 
                     :key="color.value"
                     class="color-item"
                     :class="{ active: form.poopColor === color.value }"
                     @click="form.poopColor = color.value"
                   >
                      <div class="color-circle" :style="{ backgroundColor: color.hex }"></div>
                      <span>{{ color.label }}</span>
                   </div>
                </div>
             </el-form-item>
             
             <el-form-item label="Texture">
                <el-radio-group v-model="form.poopTexture">
                   <el-radio label="watery">Watery</el-radio>
                   <el-radio label="paste">Paste</el-radio>
                   <el-radio label="hard">Hard</el-radio>
                </el-radio-group>
             </el-form-item>
          </div>
          
          <el-form-item label="Note">
             <el-input v-model="form.note" type="textarea" placeholder="Optional note..." />
          </el-form-item>
          
          <el-form-item label="Time">
             <el-date-picker v-model="form.time" type="datetime" style="width: 100%" />
          </el-form-item>
          
          <el-button type="primary" size="large" class="submit-btn" @click="save">Save Record</el-button>
       </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Back } from '@element-plus/icons-vue'
import { useRecordStore } from '@/stores/record'
import { useBabyStore } from '@/stores/baby'
import { ElMessage } from 'element-plus'

const router = useRouter()
const recordStore = useRecordStore()
const babyStore = useBabyStore()

const form = reactive({
  type: 'pee' as 'pee' | 'poop' | 'both',
  poopColor: '',
  poopTexture: '',
  note: '',
  time: new Date()
})

const colors = [
  { value: 'yellow', label: 'Yellow', hex: '#FFD700' },
  { value: 'green', label: 'Green', hex: '#90EE90' },
  { value: 'brown', label: 'Brown', hex: '#8B4513' },
  { value: 'black', label: 'Black', hex: '#000000' }
]

const save = () => {
   if (!babyStore.currentBaby) return
   
   recordStore.addRecord({
      babyId: babyStore.currentBaby.babyId,
      type: 'diaper',
      startTime: form.time.getTime(),
      detail: {
         diaperType: form.type,
         poopColor: form.poopColor,
         poopTexture: form.poopTexture,
         note: form.note
      }
   })
   
   ElMessage.success('Saved successfully')
   router.back()
}
</script>

<style scoped lang="scss">
.diaper-page {
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
.type-selector {
  width: 100%;
  display: flex;
  justify-content: center;
}
.color-grid {
   display: flex; 
   gap: 15px;
}
.color-item {
   display: flex;
   flex-direction: column;
   align-items: center;
   cursor: pointer;
   padding: 5px;
   border-radius: 8px;
   border: 2px solid transparent;
   
   &.active {
      border-color: var(--el-color-primary);
      background-color: var(--el-color-primary-light-9);
   }
}
.color-circle {
   width: 40px;
   height: 40px;
   border-radius: 50%;
   margin-bottom: 5px;
   border: 1px solid #ddd;
}
.submit-btn {
   width: 100%;
   margin-top: 20px;
}
</style>
