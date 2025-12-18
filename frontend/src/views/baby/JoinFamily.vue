<template>
  <div class="join-page">
    <el-card class="join-card" v-loading="loading">
      <h2>Join Family</h2>
      <p>You have been invited to join a baby's family group.</p>
      
      <div v-if="success" class="success-box">
          <el-icon class="success-icon"><CircleCheckFilled /></el-icon>
          <h3>Successfully Joined!</h3>
          <el-button type="primary" @click="router.push('/')">Go to Dashboard</el-button>
      </div>

      <div v-else class="action-box">
          <p class="token-info">Token: {{ token?.slice(0, 10) }}...</p>
          <el-button type="primary" size="large" @click="handleJoin">Accept Invitation</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import * as babyApi from '@/api/baby'
import { ElMessage } from 'element-plus'
import { CircleCheckFilled } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const loading = ref(false)
const success = ref(false)
const token = ref('')

onMounted(() => {
    token.value = route.query.token as string
    if (!token.value) {
        ElMessage.error('Invalid invitation link')
        router.push('/')
    }
})

const handleJoin = async () => {
    loading.value = true
    try {
        await babyApi.joinBaby(token.value)
        success.value = true
        ElMessage.success('Joined successfully!')
    } catch (e: any) {
        ElMessage.error(e.response?.data?.message || 'Failed to join')
    } finally {
        loading.value = false
    }
}
</script>

<style scoped lang="scss">
.join-page {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--el-bg-color-page);
}

.join-card {
  width: 100%;
  max-width: 400px;
  text-align: center;
  padding: 40px 20px;
  
  h2 {
    color: var(--el-color-primary);
  }
}

.success-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin-top: 20px;
    
    .success-icon {
        font-size: 60px;
        color: var(--el-color-success);
    }
}

.action-box {
    margin-top: 30px;
}

.token-info {
    font-size: 12px;
    color: #999;
    margin-bottom: 20px;
}
</style>
