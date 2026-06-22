<template>
  <div class="grid min-h-[60vh] place-items-center text-center">
    <div>
      <p class="text-sm font-semibold text-brand-700">403</p>
      <h1 class="mt-2 text-3xl font-semibold text-slate-950">Permission denied</h1>
      <p class="mt-2 text-slate-500">Your account does not have permission to access this page.</p>
      <RouterLink to="/dashboard">
        <el-button class="mt-6" type="primary">Back to dashboard</el-button>
      </RouterLink>
    </div>
  </div>
</template>
