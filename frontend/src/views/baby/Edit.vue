<template>
  <div class="baby-edit-page">
    <div class="page-header">
      <el-button link :icon="Back" @click="goBack">Back</el-button>
      <h2>{{ isEdit ? 'Edit Baby' : 'Add Baby' }}</h2>
    </div>

    <el-card class="form-card">
      <el-form 
        ref="formRef" 
        :model="formData" 
        :rules="rules" 
        label-position="top"
        v-loading="loading"
      >
        <el-form-item label="Avatar">
          <div class="avatar-uploader" @click="handleUploadAvatar">
            <el-avatar :size="80" :src="formData.avatarUrl || ''" icon="UserFilled" />
            <div class="upload-text">Click to upload</div>
          </div>
        </el-form-item>

        <el-form-item label="Name" prop="name">
          <el-input v-model="formData.name" placeholder="Baby Name" />
        </el-form-item>

        <el-form-item label="Nickname" prop="nickname">
          <el-input v-model="formData.nickname" placeholder="Nickname (Optional)" />
        </el-form-item>

        <el-form-item label="Gender" prop="gender">
          <el-radio-group v-model="formData.gender">
            <el-radio label="male">Boy</el-radio>
            <el-radio label="female">Girl</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="Birth Date" prop="birthDate">
          <el-date-picker
            v-model="formData.birthDate"
            type="date"
            placeholder="Select Birth Date"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm" :loading="submitting" style="width: 100%">
            {{ isEdit ? 'Save Changes' : 'Create Baby' }}
          </el-button>
          
          <!-- Family Invite Section -->
          <div v-if="isEdit" style="width: 100%; margin-top: 20px; border-top: 1px solid #eee; padding-top: 20px;">
              <h4 style="margin-bottom: 10px;">Family Collaboration</h4>
              <el-button v-if="!inviteUrl" type="warning" plain style="width: 100%" @click="generateInvite">
                  Invite Family Member
              </el-button>
              <div v-else class="invite-box">
                  <el-input v-model="inviteUrl" readonly>
                      <template #append>
                          <el-button @click="copyInvite">Copy</el-button>
                      </template>
                  </el-input>
                  <p class="hint">Link valid for 24 hours</p>
              </div>
          </div>

          <el-button @click="goBack" style="width: 100%; margin: 10px 0 0 0;">Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBabyStore } from '@/stores/baby'
import * as babyApi from '@/api/baby'
import { Back, UserFilled } from '@element-plus/icons-vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'

const route = useRoute()
const router = useRouter()
const babyStore = useBabyStore()
const formRef = ref<FormInstance>()

const isEdit = computed(() => !!route.params.id)
const loading = ref(false)
const submitting = ref(false)

const formData = reactive({
  name: '',
  nickname: '',
  gender: 'male' as 'male' | 'female',
  birthDate: '',
  avatarUrl: ''
})

const rules = reactive<FormRules>({
  name: [
    { required: true, message: 'Please input baby name', trigger: 'blur' },
  ],
  gender: [
    { required: true, message: 'Please select gender', trigger: 'change' },
  ],
  birthDate: [
    { required: true, message: 'Please pick a date', trigger: 'change' },
  ],
})

onMounted(() => {
  if (isEdit.value) {
    const id = route.params.id as string
    const baby = babyStore.babyList.find(b => b.babyId === id)
    if (baby) {
      formData.name = baby.name
      formData.nickname = baby.nickname || ''
      formData.gender = baby.gender
      formData.birthDate = baby.birthDate
      formData.avatarUrl = baby.avatarUrl || ''
    } else {
      ElMessage.error('Baby not found')
      router.push('/baby/list')
    }
  }
})

const goBack = () => router.back()

const handleUploadAvatar = () => {
    ElMessage.info('Avatar upload mock: success')
    formData.avatarUrl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
}

const submitForm = async () => {
  if (!formRef.value) return
  await formRef.value.validate((valid, fields) => {
    if (valid) {
      submitting.value = true
      // Simulate API call
      setTimeout(() => {
        if (isEdit.value) {
          babyStore.updateBaby(route.params.id as string, formData)
          ElMessage.success('Baby updated successfully')
        } else {
          babyStore.addBaby(formData)
          ElMessage.success('Baby created successfully')
        }
        submitting.value = false
        router.push('/baby/list')
      }, 500)
    } else {
      console.log('error submit!', fields)
    }
  })
}

const inviteUrl = ref('')

const generateInvite = async () => {
    try {
        const res = await babyApi.inviteBaby(route.params.id as string)
        inviteUrl.value = res.url
        ElMessage.success('Invitation link generated!')
    } catch (e) {
        ElMessage.error('Failed to generate invite')
    }
}

const copyInvite = () => {
    navigator.clipboard.writeText(inviteUrl.value)
    ElMessage.success('Link copied to clipboard')
}
</script>

<style scoped lang="scss">
.baby-edit-page {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}
.page-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  h2 {
      margin-left: 10px;
  }
}

.avatar-uploader {
    text-align: center;
    cursor: pointer;
    margin-bottom: 10px;
    
    .upload-text {
        font-size: 12px;
        color: var(--el-text-color-secondary);
        margin-top: 5px;
    }
}
</style>
