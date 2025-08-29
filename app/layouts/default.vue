<script lang="ts" setup>
import { useAuthStore } from "../../stores/auth";

const auth = useAuthStore();
await auth.init();
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <AppNavBar />
    <main>
      <slot />
    </main>
  </div>
</template>
