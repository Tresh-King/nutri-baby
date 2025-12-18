<template>
  <el-card class="daily-tips-card" shadow="hover">
    <template #header>
      <div class="card-header">
        <span>Daily Tips</span>
      </div>
    </template>
    <div v-for="tip in tips" :key="tip.id" class="tip-item" @click="$emit('tip-click', tip)">
      <el-tag :type="getPriorityType(tip.priority)" size="small" class="tip-type">{{ tip.type }}</el-tag>
      <span class="tip-title">{{ tip.title }}</span>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

interface DailyTip {
  id: string
  title: string
  description: string
  type: string
  priority: 'high' | 'medium' | 'low'
}

defineProps({
  tips: {
    type: Array as PropType<DailyTip[]>,
    default: () => []
  },
  maxDisplay: {
    type: Number,
    default: 10
  }
})

defineEmits(['tip-click'])

const getPriorityType = (priority: string) => {
  switch (priority) {
    case 'high': return 'danger'
    case 'medium': return 'warning'
    default: return 'info'
  }
}
</script>

<style scoped lang="scss">
.daily-tips-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tip-item {
  display: flex;
  align-items: center;
  padding: 10px 0;
  cursor: pointer;
  border-bottom: 1px solid var(--el-border-color-lighter);
  
  &:last-child {
    border-bottom: none;
  }
}

.tip-type {
  margin-right: 10px;
}

.tip-title {
  font-size: 14px;
  color: var(--el-text-color-regular);
}
</style>
