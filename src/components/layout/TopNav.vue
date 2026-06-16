<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Fold, Expand, SwitchButton, User } from '@element-plus/icons-vue'
import { useAuthStore } from '@/stores/auth'

defineProps<{ collapsed: boolean }>()
const emit = defineEmits<{ toggleSidebar: [] }>()

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const breadcrumbs = computed(() => route.matched.filter((record) => record.meta.title).map((record) => record.meta.title as string))

async function logout() {
  await auth.logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <header class="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 lg:px-6">
    <div class="flex min-w-0 items-center gap-4">
      <el-button text circle @click="emit('toggleSidebar')">
        <el-icon><component :is="collapsed ? Expand : Fold" /></el-icon>
      </el-button>
      <el-breadcrumb class="hidden min-w-0 sm:block" separator="/">
        <el-breadcrumb-item v-for="item in breadcrumbs" :key="item">{{ item }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-dropdown trigger="click">
      <button class="flex items-center gap-2 rounded px-2 py-1.5 hover:bg-slate-100">
        <el-avatar :size="32" :src="auth.user?.avatar || undefined">
          <el-icon><User /></el-icon>
        </el-avatar>
        <span class="hidden text-sm font-semibold text-slate-700 sm:inline">{{ auth.user?.name }}</span>
      </button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="router.push('/profile')">Profile</el-dropdown-item>
          <el-dropdown-item @click="router.push('/settings')">Settings</el-dropdown-item>
          <el-dropdown-item divided @click="logout">
            <el-icon><SwitchButton /></el-icon>
            Logout
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </header>
</template>
