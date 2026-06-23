<template>
  <main class="grid min-h-screen place-items-center bg-slate-50 px-4 dark:bg-slate-950">
    <section class="panel max-w-xl p-8 text-center">
      <i class="pi pi-exclamation-circle text-3xl text-red-600" />
      <h1 class="mt-4 text-xl font-semibold">Server error</h1>
      <p class="muted mt-2">Something went wrong while processing the request.</p>
      <RouterLink class="mt-5 inline-flex font-medium text-cyan-700" to="/dashboard">Go to dashboard</RouterLink>
    </section>
  </main>
</template>
