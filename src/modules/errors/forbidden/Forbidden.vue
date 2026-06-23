<template>
  <section class="panel mx-auto max-w-xl p-8 text-center">
    <i class="pi pi-lock text-3xl text-amber-600" />
    <h1 class="mt-4 text-xl font-semibold">Access denied</h1>
    <p class="muted mt-2">Your current role does not include permission to view this page.</p>
    <RouterLink class="mt-5 inline-flex font-medium text-cyan-700" to="/dashboard">Return to dashboard</RouterLink>
  </section>
</template>
