<template>
  <div class="common-layout">
    <el-container class="main-container">
      
      <!-- Desktop Sidebar -->
      <el-aside width="240px" class="hidden-xs-only app-sidebar">
        <div class="sidebar-logo">
           <img src="@/assets/vue.svg" alt="Logo" class="logo-img"/>
           <span>Nutri-Baby</span>
        </div>
        <el-menu
          :default-active="activeRoute"
          class="sidebar-menu"
          router
        >
          <el-menu-item index="/">
            <el-icon><House /></el-icon>
            <span>首页概览</span>
          </el-menu-item>
          <el-menu-item index="/timeline">
            <el-icon><Timer /></el-icon>
            <span>时光轴</span>
          </el-menu-item>
          <el-menu-item index="/statistics">
            <el-icon><PieChart /></el-icon>
            <span>数据统计</span>
          </el-menu-item>
           <el-menu-item index="/baby/list">
            <el-icon><User /></el-icon>
            <span>宝宝管理</span>
          </el-menu-item>
          <el-menu-item index="/user">
            <el-icon><Setting /></el-icon>
            <span>个人中心</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-container>
        <!-- Header -->
        <el-header class="app-header">
           <div class="header-left hidden-sm-and-up">
              <span class="mobile-logo">Nutri-Baby</span>
           </div>
           <div class="header-right">
              <el-dropdown>
                <span class="el-dropdown-link user-profile">
                   <el-avatar :size="32" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
                   <span class="username hidden-xs-only">User</span>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>个人设置</el-dropdown-item>
                    <el-dropdown-item divided>退出登录</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
           </div>
        </el-header>

        <!-- Main Content -->
        <el-main class="app-main">
           <div class="content-wrapper">
             <router-view v-slot="{ Component }">
               <transition name="fade" mode="out-in">
                 <component :is="Component" />
               </transition>
             </router-view>
           </div>
        </el-main>

        <!-- Mobile Bottom Nav -->
        <el-footer class="app-footer hidden-sm-and-up">
          <el-menu
            :default-active="activeRoute"
            mode="horizontal"
            :ellipsis="false"
            router
            class="mobile-nav"
          >
            <el-menu-item index="/">
              <el-icon><House /></el-icon>
              <span>首页</span>
            </el-menu-item>
             <el-menu-item index="/timeline">
              <el-icon><Timer /></el-icon>
              <span>记录</span>
            </el-menu-item>
            <el-menu-item index="/statistics">
              <el-icon><PieChart /></el-icon>
              <span>统计</span>
            </el-menu-item>
            <el-menu-item index="/user">
              <el-icon><User /></el-icon>
              <span>我的</span>
            </el-menu-item>
          </el-menu>
        </el-footer>

      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { House, Timer, PieChart, User, Setting } from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/display.css' // Important for hidden classes

const route = useRoute()
const activeRoute = computed(() => route.path)
</script>

<style scoped lang="scss">
.common-layout {
  height: 100vh;
  display: flex;
  background-color: #f5f7fa;
}

.main-container {
  height: 100%;
  width: 100%;
}

/* Sidebar (Desktop) */
.app-sidebar {
  background-color: #fff;
  border-right: 1px solid #e6e6e6;
  display: flex;
  flex-direction: column;

  .sidebar-logo {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #f0f0f0;
    font-size: 20px;
    font-weight: bold;
    color: var(--el-color-primary);
    
    .logo-img {
       width: 28px;
       height: 28px;
       margin-right: 10px;
    }
  }

  .sidebar-menu {
    border-right: none;
    flex: 1;
  }
}

/* Header */
.app-header {
  height: 60px;
  background-color: #fff;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  
  .mobile-logo {
     font-weight: bold;
     font-size: 18px;
     color: var(--el-color-primary);
  }
  
  .header-right {
     margin-left: auto;
  }
  
  .user-profile {
     display: flex;
     align-items: center;
     cursor: pointer;
     
     .username {
        margin-left: 8px;
        font-size: 14px;
        color: #606266;
     }
  }
}

/* Main Content */
.app-main {
  padding: 0;
  overflow-y: auto;
  
  .content-wrapper {
     padding: 20px;
     max-width: 1200px; /* PC Content Limit */
     margin: 0 auto;
     
     /* Mobile Adjustments */
     @media (max-width: 768px) {
        padding: 15px;
        padding-bottom: 80px; /* Space for footer */
     }
  }
}

/* Mobile Bottom Nav */
.app-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: auto;
  padding: 0;
  z-index: 100;
  background-color: #fff;
  border-top: 1px solid #eba6a6;
  box-shadow: 0 -2px 10px rgba(0,0,0,0.05);
}

.mobile-nav {
  display: flex;
  justify-content: space-around;
  width: 100%;
  border-top: none;
  
  .el-menu-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 56px;
    line-height: 1;
    padding: 0;
    
    &.is-active {
       background-color: transparent !important;
    }
    
    .el-icon {
      margin-bottom: 4px;
      font-size: 20px;
    }
    
    span {
      font-size: 10px;
      transform: scale(0.9);
    }
  }
}

/* Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
