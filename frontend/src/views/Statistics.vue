<template>
  <div class="statistics-page">
    <div class="page-header">
      <h2>Statistics</h2>
      <el-radio-group v-model="timeRange" size="small">
        <el-radio-button label="week">Week</el-radio-button>
        <el-radio-button label="month">Month</el-radio-button>
      </el-radio-group>
    </div>

    <!-- Feeding Section -->
    <el-card class="section-card" shadow="never">
      <template #header>
        <div class="card-header">
          <span><el-icon><Mug /></el-icon> Feeding</span>
        </div>
      </template>

      <el-row :gutter="20" class="stat-cards">
        <el-col :span="8">
           <div class="stat-item">
             <div class="label">Total</div>
             <div class="value">{{ feedingStats.totalMilk }} ml</div>
           </div>
        </el-col>
        <el-col :span="8">
           <div class="stat-item">
             <div class="label">Count</div>
             <div class="value">{{ feedingStats.count }} times</div>
           </div>
        </el-col>
        <el-col :span="8">
           <div class="stat-item">
             <div class="label">Avg</div>
             <div class="value">{{ feedingStats.avgMilk }} ml</div>
           </div>
        </el-col>
      </el-row>

      <div class="chart-container">
        <v-chart class="chart" :option="feedingChartOption" autoresize />
      </div>
    </el-card>

    <!-- Growth Section -->
    <el-card class="section-card" shadow="never">
      <template #header>
        <div class="card-header">
          <span><el-icon><TrendCharts /></el-icon> Growth</span>
        </div>
      </template>

      <el-row :gutter="20" class="stat-cards">
        <el-col :span="12">
           <div class="stat-item">
             <div class="label">Latest Height</div>
             <div class="value">{{ growthStats.latestHeight }} cm</div>
           </div>
        </el-col>
        <el-col :span="12">
           <div class="stat-item">
             <div class="label">Latest Weight</div>
             <div class="value">{{ growthStats.latestWeight }} kg</div>
           </div>
        </el-col>
      </el-row>

      <div class="chart-container">
        <h4>Height Trend</h4>
        <v-chart class="chart" :option="heightChartOption" autoresize />
      </div>
       <div class="chart-container">
        <h4>Weight Trend</h4>
        <v-chart class="chart" :option="weightChartOption" autoresize />
      </div>
    </el-card>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted, watch } from 'vue'
import { Mug, TrendCharts } from '@element-plus/icons-vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent, TitleComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import { getStatistics, getGrowthStandards } from '@/api/statistics'
import { useBabyStore } from '@/stores/baby'

use([
  CanvasRenderer,
  BarChart,
  LineChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent
])

const timeRange = ref('week')
const babyStore = useBabyStore()
const loading = ref(false)

// Data State
const feedingStats = reactive({
  totalMilk: 0,
  count: 0,
  avgMilk: 0,
  chartData: { labels: [] as string[], values: [] as number[] }
})

const growthStats = reactive({
  latestHeight: 0,
  latestWeight: 0,
  heightChart: { labels: [] as string[], values: [] as number[] },
  weightChart: { labels: [] as string[], values: [] as number[] }
})

// Standards State
const standards = reactive({
    height: [] as any[],
    weight: [] as any[]
})

const fetchData = async () => {
    if (!babyStore.currentBaby?.babyId) return
    
    loading.value = true
    try {
        const [stats, heightStd, weightStd] = await Promise.all([
             getStatistics(babyStore.currentBaby.babyId),
             getGrowthStandards('height', babyStore.currentBaby.gender),
             getGrowthStandards('weight', babyStore.currentBaby.gender)
        ])
        
        const data: any = stats

        // Standards
        standards.height = heightStd
        standards.weight = weightStd

        // Feeding
        const feeding = data.feeding
        feedingStats.totalMilk = feeding.total
        feedingStats.count = feeding.count
        feedingStats.avgMilk = feeding.average
        feedingStats.chartData.labels = feeding.chart.map((i: any) => i.date)
        feedingStats.chartData.values = feeding.chart.map((i: any) => i.amount)

        // Growth
        const growth = data.growth
        growthStats.latestHeight = growth.latestHeight
        growthStats.latestWeight = growth.latestWeight
        
        // Growth charts are usually cumulative over time, not just the selected range, unless specified
        // For simplicity, let's assume the API returns what we need
        growthStats.heightChart.labels = growth.heightChart.map((i: any) => i.date)
        growthStats.heightChart.values = growth.heightChart.map((i: any) => i.value)
        
        growthStats.weightChart.labels = growth.weightChart.map((i: any) => i.date)
        growthStats.weightChart.values = growth.weightChart.map((i: any) => i.value)

    } catch (e) {
        console.error('Failed to load stats', e)
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    fetchData()
})

watch(() => babyStore.currentBaby?.babyId, () => {
    fetchData()
})

watch(timeRange, () => {
    // API might support timeRange param
    fetchData()
})


// Chart Options
const feedingChartOption = computed(() => ({
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: feedingStats.chartData.labels,
    axisTick: { alignWithLabel: true }
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'Milk (ml)',
      type: 'bar',
      barWidth: '60%',
      data: feedingStats.chartData.values,
      itemStyle: { color: '#409EFF' }
    }
  ]
}))

const heightChartOption = computed(() => {
  // Add Standard Lines (P3, P50, P97)
  const standardSeries = [
    {
      name: 'P50 (Standard)',
      data: standards.height.map((s: any) => s.p50),
      type: 'line',
      smooth: true,
      showSymbol: false,
      lineStyle: { type: 'dashed', color: '#909399', width: 1 },
      itemStyle: { color: '#909399' }
    },
    {
      name: 'P3-P97',
      type: 'line',
      data: standards.height.map((s: any) => s.p97),
      lineStyle: { opacity: 0 },
      areaStyle: {
        color: '#E1F3D8',
        origin: 'start',
        opacity: 0.3
      },
      stack: 'confidence-band',
      symbol: 'none'
    },
    {
      name: 'P3-P97-Lower',
      type: 'line',
      data: standards.height.map((s: any) => s.p3),
      lineStyle: { opacity: 0 },
      areaStyle: {
        color: '#fff',
        origin: 'start',
        opacity: 1
      },
      stack: 'confidence-band',
      symbol: 'none'
    }
  ]
  // Note: ECharts confidence band implementation usually involves 'stack' tricks or 'custom' series. 
  // For simplicity here, we just show P50 line.
  
  return {
    tooltip: { trigger: 'axis' },
    legend: { show: true },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: {
      type: 'category',
      data: [...new Set([...growthStats.heightChart.labels, ...standards.height.map((s:any) => `Month ${s.month}`)])].sort() // Simplified merge
    },
    yAxis: { type: 'value', min: 40 },
    series: [
      {
        name: 'Height',
        data: growthStats.heightChart.values,
        type: 'line',
        smooth: true,
        itemStyle: { color: '#67C23A' },
        markLine: {
            data: [
                { type: 'average', name: 'Avg' }
            ]
        }
      },
      {
          name: 'P50 (WHO)',
          type: 'line',
          data: standards.height.map((s:any) => s.p50),
          smooth: true,
          showSymbol: false,
          lineStyle: { type: 'dashed', color: '#999' }
      }
    ]
  }
})

const weightChartOption = computed(() => {
    return {
      tooltip: { trigger: 'axis' },
      legend: { show: true },
      grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
      xAxis: {
        type: 'category',
        data: growthStats.weightChart.labels
      },
      yAxis: { type: 'value', min: 2 },
      series: [
        {
          name: 'Weight',
          data: growthStats.weightChart.values,
          type: 'line',
          smooth: true,
          itemStyle: { color: '#E6A23C' }
        },
        {
          name: 'P50 (WHO)',
          type: 'line',
          data: standards.weight.map((s:any) => s.p50),
          smooth: true,
          showSymbol: false,
          lineStyle: { type: 'dashed', color: '#999' }
        }
      ]
    }
})
</script>

<style scoped lang="scss">
.statistics-page {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  align-items: center;
  span {
      display: flex;
      align-items: center;
      gap: 5px;
      font-weight: bold;
  }
}

.stat-cards {
  margin-bottom: 20px;
  text-align: center;
}

.stat-item {
  .label {
    font-size: 12px;
    color: var(--el-text-color-secondary);
  }
  .value {
    font-size: 18px;
    font-weight: bold;
    color: var(--el-text-color-primary);
  }
}

.chart-container {
  height: 300px;
  margin-top: 20px;
  
  h4 {
      text-align: center;
      color: var(--el-text-color-regular);
      margin-bottom: 10px;
  }
}

.chart {
  height: 100%;
  width: 100%;
}
</style>
