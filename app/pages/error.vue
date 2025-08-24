<script lang="ts" setup>
const route = useRoute();
const error = route.query.error || "Oh No! Something went wrong.";
</script>

<template>
  <div class="container flex flex-col items-center justify-center bg-base-300 mt-4 min-h-42 text-center mx-auto gap-6">
    <div role="alert" class="alert alert-error w-full max-w-4xl text-center px-6 py-4 shadow-lg">
      <span class="text-lg font-semibold w-full">{{ error }}</span>
    </div>

    <NuxtLink to="/" class="btn btn-primary flex items-center gap-2">
      <Icon name="tabler:arrow-left" size="20" />
      Home
    </NuxtLink>
  </div>
</template>
