<template>
  <div class="grid min-h-screen place-items-center bg-slate-50 p-6 text-center">
    <div>
      <p class="text-sm font-semibold text-brand-700">404</p>
      <h1 class="mt-2 text-3xl font-semibold text-slate-950">Page not found</h1>
      <p class="mt-2 text-slate-500">The page you are looking for does not exist.</p>
      <RouterLink to="/dashboard">
        <el-button class="mt-6" type="primary">Go to dashboard</el-button>
      </RouterLink>
    </div>
  </div>
</template>
