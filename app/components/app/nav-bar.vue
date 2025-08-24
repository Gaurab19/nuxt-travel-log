<script setup lang="ts">
</script>

<template>
  <div class="navbar bg-primary text-primary-content">
    <div class="navbar-start">
      <NuxtLink to="/" class="btn btn-ghost text-xl">
        Travel Log
      </NuxtLink>
    </div>
    <div class="navbar-end gap-4">
      <AppThemeToggle />
      <auth-button :show-text="false" />
    </div>
  </div>
</template>
