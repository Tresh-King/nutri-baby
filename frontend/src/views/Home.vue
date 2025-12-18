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
                <span class="card-title">最近喂养</span>
                <el-button link type="primary">去记录</el-button>
              </div>
            </template>
            <div class="feeding-content">
              <el-icon :size="24" color="#409EFF"><Mug /></el-icon>
              <span class="feeding-time">{{ lastFeedingTime }}</span>
              <span class="feeding-detail" v-if="lastFeedingDetail">{{ lastFeedingDetail }}</span>
            </div>
        </el-card>

        <!-- Today's Stats -->
        <div class="section-title">今日概览</div>
        <el-row :gutter="16">
          <!-- Feeding -->
           <el-col :xs="12" :sm="6" :md="6">
            <el-card shadow="never" class="stat-card">
              <div class="stat-value">{{ todayStats.breastfeedingCount }} 次</div>
              <div class="stat-label">母乳喂养</div>
            </el-card>
           </el-col>
           <el-col :xs="12" :sm="6" :md="6">
            <el-card shadow="never" class="stat-card">
              <div class="stat-value">{{ todayStats.bottleFeedingCount }} 次</div>
               <div class="stat-label">瓶喂 ({{ todayStats.totalMilk }}ml)</div>
            </el-card>
           </el-col>
           <!-- Sleep -->
           <el-col :xs="12" :sm="6" :md="6">
            <el-card shadow="never" class="stat-card">
              <div class="stat-value">{{ formatSleepDuration(todayStats.sleepDurationMinutes) }}</div>
              <div class="stat-label">睡眠时长</div>
            </el-card>
           </el-col>
           <!-- Diaper -->
           <el-col :xs="12" :sm="6" :md="6">
            <el-card shadow="never" class="stat-card">
              <div class="stat-value">{{ todayStats.diaperCount }} 次</div>
               <div class="stat-label">换尿布</div>
            </el-card>
           </el-col>
        </el-row>

      </el-col>

      <el-col :xs="24" :sm="8">
         <!-- Quick Actions -->
         <el-card class="quick-actions" shadow="hover">
            <template #header>
               <div class="card-header">
                 <span class="card-title">快速记录</span>
               </div>
            </template>
            <div class="action-grid">
               <div class="action-item" @click="handleFeeding">
                 <el-button type="primary" circle size="large" class="action-btn"><el-icon :size="20"><Mug /></el-icon></el-button>
                 <span>喂养</span>
               </div>
               <div class="action-item" @click="handleSleep">
                 <el-button type="success" circle size="large" class="action-btn"><el-icon :size="20"><Moon /></el-icon></el-button>
                 <span>睡眠</span>
               </div>
               <div class="action-item" @click="handleDiaper">
                 <el-button type="warning" circle size="large" class="action-btn"><el-icon :size="20"><ToiletPaper /></el-icon></el-button>
                 <span>尿布</span>
               </div>
               <div class="action-item" @click="handleGrowth">
                 <el-button type="info" circle size="large" class="action-btn"><el-icon :size="20"><TrendCharts /></el-icon></el-button>
                 <span>生长</span>
               </div>
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
const upcomingVaccines = ref(['疫苗提醒：乙肝疫苗（第二针）预计 2025-01-15'])
const todayTips = ref([
  { id: '1', title: '今天开始尝试俯卧时间 (Tummy Time)!', description: '', type: 'Activity', priority: 'high' as const },
  { id: '2', title: '注意观察宝宝的睡眠信号', description: '', type: 'Sleep', priority: 'medium' as const }
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
const lastFeedingDetail = ref('母乳亲喂 - 右侧')

const formatSleepDuration = (minutes: number) => {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return h > 0 ? `${h}小时 ${m}分` : `${m}分`
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
  border-radius: 12px;
}
.feeding-content {
  display: flex;
  align-items: center;
  font-size: 16px;
  .el-icon {
    margin-right: 12px;
    background: #ecf5ff;
    padding: 8px;
    border-radius: 50%;
  }
  .feeding-time {
      font-weight: 500;
      margin-right: 10px;
  }
  .feeding-detail {
      color: #909399;
      font-size: 14px;
  }
}
.section-title {
  margin: 24px 0 12px;
  font-weight: 600;
  font-size: 18px;
  color: #303133;
}
.stat-card {
  margin-bottom: 10px;
  text-align: center;
  border-radius: 12px;
  transition: transform 0.2s;
  
  &:hover {
      transform: translateY(-2px);
  }

  .stat-value {
    font-size: 20px;
    font-weight: bold;
    color: var(--el-color-primary);
    margin-bottom: 4px;
  }
  .stat-label {
    font-size: 13px;
    color: var(--el-text-color-secondary);
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .card-title {
      font-weight: 600;
      font-size: 16px;
  }
}

.quick-actions {
  margin-top: 20px;
  border-radius: 12px;
  
  @media (min-width: 768px) {
     margin-top: 0;
  }
}

.action-grid {
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
}

.action-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    
    .action-btn {
        margin-bottom: 8px;
        transition: transform 0.2s;
    }
    
    &:hover .action-btn {
        transform: scale(1.1);
    }

    span {
        font-size: 13px;
        color: #606266;
    }
}
</style>
