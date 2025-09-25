<script lang="ts" setup>
import { useAuthStore } from "../../../stores/auth";

const auth = useAuthStore();
const loading = ref(false);
async function getLocationData() {
  loading.value = true;
  const res = await $fetch("/api/location", {
    method: "GET",
  });
  console.warn("res", res);
  loading.value = false;
}
getLocationData();
</script>

<template>
  <div v-if="!auth.user && loading" class="flex justify-center items-center h-full">
    <span class="loading loading-infinity loading-xl text-primary" />
  </div>
  <div v-else class="page-content-top">
    <h2 class="text-2xl">
      Locations
    </h2>
    <div class="flex flex-col gap-2 mt-4">
      <p>Add a location to get started</p>
      <NuxtLink to="/dashboard/add" class="btn btn-primary w-40">
        Add Location
        <Icon name="tabler:circle-plus-filled" size="24" />
      </NuxtLink>
    </div>
  </div>
</template>
