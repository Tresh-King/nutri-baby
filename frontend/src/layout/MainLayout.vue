<template>
  <div class="common-layout">
    <el-container>
      <!-- Header for Desktop / Mobile -->
      <el-header class="app-header">
        <div class="logo">Nutri-Baby</div>
        <div class="header-actions">
           <!-- Placeholder for actions -->
        </div>
      </el-header>

      <el-main class="app-main">
        <router-view />
      </el-main>

      <!-- Bottom Navigation for Mobile -->
       <el-footer class="app-footer mobile-only">
        <el-menu
          :default-active="activeRoute"
          mode="horizontal"
          :ellipsis="false"
          router
          class="mobile-nav"
        >
          <el-menu-item index="/">
            <el-icon><House /></el-icon>
            <span>Home</span>
          </el-menu-item>
          <el-menu-item index="/timeline">
            <el-icon><Timer /></el-icon>
            <span>Timeline</span>
          </el-menu-item>
          <el-menu-item index="/statistics">
            <el-icon><PieChart /></el-icon>
            <span>Statistics</span>
          </el-menu-item>
          <el-menu-item index="/user">
            <el-icon><User /></el-icon>
            <span>User</span>
          </el-menu-item>
        </el-menu>
      </el-footer>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { House, Timer, PieChart, User } from '@element-plus/icons-vue'

const route = useRoute()
const activeRoute = computed(() => route.path)
</script>

<style scoped lang="scss">
.common-layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.el-container {
  height: 100%;
}

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--el-border-color);
  padding: 0 20px;
}

.app-main {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  /* Add padding-bottom to avoid overlap with footer on mobile */
  padding-bottom: 70px; 
}

.app-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 0;
  z-index: 100;
  background-color: var(--el-bg-color);
  border-top: 1px solid var(--el-border-color);
}

.mobile-nav {
  display: flex;
  justify-content: space-around;
  width: 100%;
  
  .el-menu-item {
    padding: 0 10px;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    line-height: 1.5;
    height: 60px;
    
    .el-icon {
      margin-bottom: 2px;
    }
  }
}

/* Responsive adjustments */
@media (min-width: 768px) {
  .mobile-only {
    display: none;
  }
  
  /* Desktop layout changes can be added here, e.g. Sidebar */
}
</style>
