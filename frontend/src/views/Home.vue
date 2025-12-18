<template>
  <div class="home-page">
    <!-- Vaccine Banner -->
    <el-alert
      v-if="upcomingVaccines.length > 0"
      :title="upcomingVaccines[0]"
      type="warning"
      show-icon
      :closable="false"
      class="vaccine-banner"
      @click="goToVaccine"
    />

    <el-row :gutter="20">
      <el-col :xs="24" :sm="16">
        <!-- AI Insight -->
        <AIInsightCard v-if="babyStore.currentBaby" />

        <!-- Daily Tips -->
        <DailyTipsCard :tips="todayTips" @tip-click="handleTipClick" />
        
        <!-- Last Feeding -->
        <el-card class="last-feeding-card" shadow="hover" @click="handleFeeding">
            <template #header>
              <div class="card-header">
                <span>Last Feeding</span>
                <el-button link>Record</el-button>
              </div>
            </template>
            <div class="feeding-content">
              <el-icon :size="20"><Mug /></el-icon>
              <span class="feeding-time">{{ lastFeedingTime }}</span>
            </div>
        </el-card>

        <!-- Today's Stats -->
        <div class="section-title">Today's Overview</div>
        <el-row :gutter="10">
          <!-- Feeding -->
           <el-col :xs="12" :sm="6">
            <el-card shadow="never" class="stat-card">
              <div class="stat-value">{{ todayStats.breastfeedingCount }} times</div>
              <div class="stat-label">Breastfeeding</div>
            </el-card>
           </el-col>
           <el-col :xs="12" :sm="6">
            <el-card shadow="never" class="stat-card">
              <div class="stat-value">{{ todayStats.bottleFeedingCount }} times</div>
               <div class="stat-label">Bottle ({{ todayStats.totalMilk }}ml)</div>
            </el-card>
           </el-col>
           <!-- Sleep -->
           <el-col :xs="12" :sm="6">
            <el-card shadow="never" class="stat-card">
              <div class="stat-value">{{ formatSleepDuration(todayStats.sleepDurationMinutes) }}</div>
              <div class="stat-label">Sleep</div>
            </el-card>
           </el-col>
           <!-- Diaper -->
           <el-col :xs="12" :sm="6">
            <el-card shadow="never" class="stat-card">
               <div class="stat-value">{{ todayStats.diaperCount }} times</div>
               <div class="stat-label">Diaper</div>
            </el-card>
           </el-col>
        </el-row>

      </el-col>

      <el-col :xs="24" :sm="8">
         <!-- Quick Actions -->
         <el-card class="quick-actions" shadow="never">
            <template #header>
               <div class="card-header">Quick Actions</div>
            </template>
            <div class="action-grid">
               <el-button type="primary" circle size="large" @click="handleFeeding"><el-icon><Mug /></el-icon></el-button>
               <el-button type="success" circle size="large" @click="handleSleep"><el-icon><Moon /></el-icon></el-button>
               <el-button type="warning" circle size="large" @click="handleDiaper"><el-icon><ToiletPaper /></el-icon></el-button>
               <el-button type="info" circle size="large" @click="handleGrowth"><el-icon><TrendCharts /></el-icon></el-button>
            </div>
            <div class="action-labels">
               <span>Feeding</span>
               <span>Sleep</span>
               <span>Diaper</span>
               <span>Growth</span>
            </div>
         </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Mug, Moon, ToiletPaper, TrendCharts } from '@element-plus/icons-vue'
import DailyTipsCard from '@/components/DailyTipsCard.vue'
import AIInsightCard from './components/AIInsightCard.vue'
import { formatRelativeTime } from '@/utils/date'
import { useBabyStore } from '@/stores/baby'

const router = useRouter()
// const userStore = useUserStore() // Mock: not used yet
const babyStore = useBabyStore()

// Mock Data
const upcomingVaccines = ref(['Hepatitis B (2nd Dose) due on 2025-01-15'])
const todayTips = ref([
  { id: '1', title: 'Start tummy time today!', description: '', type: 'Activity', priority: 'high' as const },
  { id: '2', title: 'Watch for sleep cues.', description: '', type: 'Sleep', priority: 'medium' as const }
])

interface DailyTips {
    id: string;
    title: string;
    description: string;
    type: string;
    priority: "high" | "medium" | "low";
}

const todayStats = ref({
  breastfeedingCount: 5,
  bottleFeedingCount: 2,
  totalMilk: 240,
  sleepDurationMinutes: 720,
  diaperCount: 6
})

const lastFeedingTime = computed(() => {
  return formatRelativeTime(new Date(Date.now() - 1000 * 60 * 120)) // 2 hours ago
})

const formatSleepDuration = (minutes: number) => {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return h > 0 ? `${h}h ${m}m` : `${m}m`
}

// Actions
const goToVaccine = () => router.push('/vaccine')
const handleTipClick = (tip: DailyTips) => console.log('Tip clicked', tip)
const handleFeeding = () => router.push('/record/feeding')
const handleSleep = () => router.push('/record/sleep')
const handleDiaper = () => router.push('/record/diaper')
const handleGrowth = () => router.push('/record/growth')

</script>

<style scoped lang="scss">
.home-page {
  padding-bottom: 20px;
}
.vaccine-banner {
  margin-bottom: 20px;
  cursor: pointer;
}
.last-feeding-card {
  margin-top: 20px;
  cursor: pointer;
}
.feeding-content {
  display: flex;
  align-items: center;
  font-size: 18px;
  .el-icon {
    margin-right: 10px;
  }
}
.section-title {
  margin: 20px 0 10px;
  font-weight: bold;
  font-size: 16px;
}
.stat-card {
  margin-bottom: 10px;
  text-align: center;
  .stat-value {
    font-size: 18px;
    font-weight: bold;
    color: var(--el-color-primary);
  }
  .stat-label {
    font-size: 12px;
    color: var(--el-text-color-secondary);
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.quick-actions {
  margin-top: 20px;
  
  @media (min-width: 768px) {
     margin-top: 0;
  }
}

.action-grid {
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
}

.action-labels {
  display: flex;
  justify-content: space-around;
  font-size: 12px;
  color: var(--el-text-color-regular);
  
  span {
    width: 40px; 
    text-align: center; 
  }
}
</style>
