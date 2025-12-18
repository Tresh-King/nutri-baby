<template>
  <div class="user-page">
    <div class="page-header">
      <h2>Profile</h2>
    </div>

    <!-- User Info Card -->
    <el-card class="user-card" shadow="hover">
      <div class="user-info">
        <el-avatar :size="80" :src="userStore.userInfo.avatar || ''" :icon="UserFilled" />
        <div class="info-content">
          <template v-if="userStore.isLoggedIn">
             <div class="nickname">{{ userStore.userInfo.nickname }}</div>
             <div class="uid">ID: {{ userStore.userInfo.id }}</div>
          </template>
          <template v-else>
             <el-button type="primary" @click="handleLogin">Login / Register</el-button>
          </template>
        </div>
      </div>
    </el-card>

    <!-- Menu Sections -->
    <div class="menu-section">
      <h3>My Family</h3>
      <el-card shadow="never" class="menu-card">
        <div class="menu-item" @click="router.push('/baby/list')">
           <div class="left">
             <el-icon class="icon"><User /></el-icon>
             <span>Baby Management</span>
           </div>
           <el-icon><ArrowRight /></el-icon>
        </div>
        <el-divider class="menu-divider" />
        <div class="menu-item" @click="showToast('Vaccine Plan coming soon')">
           <div class="left">
             <el-icon class="icon"><List /></el-icon>
             <span>Vaccine Plan</span>
           </div>
           <el-icon><ArrowRight /></el-icon>
        </div>
      </el-card>
    </div>

    <div class="menu-section">
      <h3>Data</h3>
      <el-card shadow="never" class="menu-card">
        <div class="menu-item" @click="router.push('/statistics')">
           <div class="left">
             <el-icon class="icon"><TrendCharts /></el-icon>
             <span>Statistics</span>
           </div>
           <el-icon><ArrowRight /></el-icon>
        </div>
      </el-card>
    </div>

    <div class="menu-section">
      <h3>Settings</h3>
      <el-card shadow="never" class="menu-card">
        <div class="menu-item" @click="showAbout">
           <div class="left">
             <el-icon class="icon"><InfoFilled /></el-icon>
             <span>About Us</span>
           </div>
           <el-icon><ArrowRight /></el-icon>
        </div>
      </el-card>
    </div>

    <div v-if="userStore.isLoggedIn" class="logout-section">
      <el-button type="danger" plain block size="large" @click="handleLogout">Log Out</el-button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { UserFilled, User, ArrowRight, List, TrendCharts, InfoFilled } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()

const handleLogin = () => {
    router.push('/login')
}

const showToast = (msg: string) => {
    ElMessage.info(msg)
}

const showAbout = () => {
    ElMessageBox.alert(
        'Nutri-Baby Web v1.0.0\nA helper for new parents.',
        'About Us',
        { confirmButtonText: 'OK' }
    )
}

const handleLogout = () => {
    ElMessageBox.confirm(
        'Are you sure you want to log out?',
        'Warning',
        {
            confirmButtonText: 'Log Out',
            cancelButtonText: 'Cancel',
            type: 'warning'
        }
    ).then(() => {
        userStore.logout()
        ElMessage.success('Logged out')
        router.push('/login')
    }).catch(() => {})
}
</script>

<style scoped lang="scss">
.user-page {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 20px;
}

.user-card {
  margin-bottom: 30px;
  .user-info {
    display: flex;
    align-items: center;
    gap: 20px;
    
    .info-content {
      flex: 1;
      .nickname {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 5px;
      }
      .uid {
        font-size: 14px;
        color: var(--el-text-color-secondary);
      }
    }
  }
}

.menu-section {
  margin-bottom: 20px;
  h3 {
    font-size: 16px;
    margin-bottom: 10px;
    color: var(--el-text-color-regular);
    margin-left: 5px;
  }
}

.menu-card {
  padding: 0 !important; // Override default padding if needed
  :deep(.el-card__body) {
      padding: 0;
  }
}

.menu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: var(--el-fill-color-light);
  }

  .left {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 16px;
    
    .icon {
      font-size: 20px;
      color: var(--el-color-primary);
    }
  }
}

.menu-divider {
  margin: 0;
}

.logout-section {
  margin-top: 40px;
  .el-button {
      width: 100%;
  }
}
</style>
