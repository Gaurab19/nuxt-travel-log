<script setup lang="ts">
import { useAuthStore } from "../../stores/auth";

const authStore = useAuthStore();
onMounted(() => {
  authStore.signOut();
});
</script>

<template>
  <div class="container flex flex-col items-center justify-center bg-base-300 mt-4 min-h-42 text-center mx-auto gap-6">
    <span class="loading loading-infinity w-5 h-5" />
  </div>
</template>
