<template>
  <div class="login-page">
    <el-card class="login-card">
      <h2>Welcome to Nutri-Baby</h2>
      <p>Please login to continue</p>
      
      <el-tabs v-model="activeTab" class="auth-tabs">
        <el-tab-pane label="Login" name="login">
            <el-form :model="loginForm" label-width="0">
                <el-form-item>
                    <el-input v-model="loginForm.phone" placeholder="Phone Number" prefix-icon="Iphone" />
                </el-form-item>
                <el-form-item>
                    <el-input v-model="loginForm.password" type="password" placeholder="Password" prefix-icon="Lock" show-password />
                </el-form-item>
                <el-button type="primary" class="full-width" @click="handleLogin" :loading="loading">Login</el-button>
            </el-form>
        </el-tab-pane>
        
        <el-tab-pane label="Register" name="register">
             <el-form :model="registerForm" label-width="0">
                <el-form-item>
                    <el-input v-model="registerForm.nickname" placeholder="Nickname" prefix-icon="User" />
                </el-form-item>
                <el-form-item>
                    <el-input v-model="registerForm.phone" placeholder="Phone Number" prefix-icon="Iphone" />
                </el-form-item>
                <el-form-item>
                    <el-input v-model="registerForm.password" type="password" placeholder="Password" prefix-icon="Lock" show-password />
                </el-form-item>
                <el-button type="success" class="full-width" @click="handleRegister" :loading="loading">Register</el-button>
            </el-form>
        </el-tab-pane>
      </el-tabs>

    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'
import { User, Iphone, Lock } from '@element-plus/icons-vue'

const router = useRouter()
const userStore = useUserStore()
const loading = ref(false)
const activeTab = ref('login')

const loginForm = reactive({
    phone: '',
    password: ''
})

const registerForm = reactive({
    nickname: '',
    phone: '',
    password: ''
})

const handleLogin = async () => {
  if(!loginForm.phone || !loginForm.password) return ElMessage.warning('Please fill all fields')
  
  loading.value = true
  try {
    await userStore.loginCredential(loginForm.phone, loginForm.password)
    ElMessage.success('Login Successful')
    router.push('/')
  } catch (e: any) {
    ElMessage.error(e.response?.data?.message || 'Login Failed')
  } finally {
    loading.value = false
  }
}

const handleRegister = async () => {
    if(!registerForm.phone || !registerForm.password) return ElMessage.warning('Please fill all fields')

    loading.value = true
    try {
        await userStore.register(registerForm.phone, registerForm.password, registerForm.nickname)
        ElMessage.success('Registration Successful')
        router.push('/')
    } catch (e: any) {
        ElMessage.error(e.response?.data?.message || 'Registration Failed')
    } finally {
        loading.value = false
    }
}
</script>

<style scoped lang="scss">
.login-page {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--el-bg-color-page);
}

.login-card {
  width: 100%;
  max-width: 400px;
  text-align: center;
  padding: 40px 20px;
  
  h2 {
    margin-bottom: 10px;
    color: var(--el-color-primary);
  }
  
  p {
    margin-bottom: 30px;
    color: var(--el-text-color-secondary);
  }
}

.auth-tabs {
    text-align: left;
}

.full-width {
    width: 100%;
    margin-top: 10px;
}
</style>
