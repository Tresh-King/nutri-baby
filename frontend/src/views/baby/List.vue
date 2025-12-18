<template>
  <div class="baby-list-page">
    <div class="page-header">
      <h2>Baby Management</h2>
      <el-button type="primary" @click="goToAdd">
        <el-icon><Plus /></el-icon> Add Baby
      </el-button>
    </div>

    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="8" v-for="baby in babyList" :key="baby.babyId">
        <el-card 
          class="baby-card" 
          :class="{ 'active-card': isCurrentBaby(baby.babyId) }"
          shadow="hover"
        >
          <div class="card-content" @click="handleSelect(baby.babyId)">
             <div class="baby-avatar">
                <el-avatar :size="60" :src="baby.avatarUrl || ''" :icon="UserFilled" />
             </div>
             <div class="baby-info">
               <div class="name-row">
                 <span class="name">{{ baby.name }}</span>
                 <el-tag size="small" v-if="baby.nickname">{{ baby.nickname }}</el-tag>
                 <el-tag size="small" type="warning" v-if="baby.isDefault">Default</el-tag>
               </div>
               <div class="meta-row">
                 <span>{{ baby.gender === 'male' ? 'Boy' : 'Girl' }}</span>
                 <el-divider direction="vertical" />
                 <span>{{ calculateAge(baby.birthDate) }}</span>
               </div>
             </div>
             <div class="check-icon" v-if="isCurrentBaby(baby.babyId)">
               <el-icon color="#67C23A" :size="24"><CircleCheckFilled /></el-icon>
             </div>
          </div>
          
          <el-divider class="card-divider" />
          
          <div class="card-actions">
            <el-button-group>
               <el-button size="small" :icon="Edit" @click.stop="handleEdit(baby.babyId)">Edit</el-button>
               <el-button size="small" :icon="Delete" type="danger" plain @click.stop="handleDelete(baby.babyId)">Delete</el-button>
               <el-button size="small" :icon="Share" plain @click.stop="handleInvite(baby.babyId)">Invite</el-button>
            </el-button-group>
          </div>
        </el-card>
      </el-col>
    </el-row>
    
    <el-empty v-if="babyList.length === 0" description="No babies added yet" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useBabyStore } from '@/stores/baby'
import { calculateAge } from '@/utils/date'
import { Plus, Edit, Delete, Share, CircleCheckFilled, UserFilled } from '@element-plus/icons-vue'
import { ElMessageBox, ElMessage } from 'element-plus'

const router = useRouter()
const babyStore = useBabyStore()

const babyList = computed(() => babyStore.babyList)
const currentBabyId = computed(() => babyStore.currentBaby?.babyId)

const isCurrentBaby = (id: string) => currentBabyId.value === id

const goToAdd = () => router.push('/baby/edit')

const handleSelect = (id: string) => {
  babyStore.setCurrentBaby(id)
  ElMessage.success('Switched current baby')
  // Optional: redirect back to home
  // router.push('/') 
}

const handleEdit = (id: string) => {
  router.push(`/baby/edit/${id}`)
}

const handleDelete = (id: string) => {
  ElMessageBox.confirm(
    'Are you sure you want to delete this baby profile? This cannot be undone.',
    'Warning',
    {
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  ).then(() => {
    babyStore.deleteBaby(id)
    ElMessage.success('Deleted successfully')
  }).catch(() => {})
}

const handleInvite = (id: string) => {
  ElMessage.info(`Invite feature for baby ${id} coming soon`)
}
</script>

<style scoped lang="scss">
.baby-list-page {
  padding: 20px;
}
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.baby-card {
  margin-bottom: 20px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.3s;
  
  &.active-card {
    border-color: var(--el-color-primary);
    background-color: var(--el-color-primary-light-9);
  }
}

.card-content {
  display: flex;
  align-items: center;
  padding-bottom: 10px;
}

.baby-avatar {
  margin-right: 15px;
}

.baby-info {
  flex: 1;
}

.name-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 5px;
  
  .name {
    font-size: 18px;
    font-weight: bold;
  }
}

.meta-row {
  color: var(--el-text-color-secondary);
  font-size: 14px;
}

.card-divider {
  margin: 10px 0;
}

.card-actions {
  display: flex;
  justify-content: flex-end;
}
</style>
