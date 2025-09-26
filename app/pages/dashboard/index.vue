<script setup lang="ts">
import { useLocationStore } from "../../../stores/locations";

const locationStore = useLocationStore();
const { locations, status } = storeToRefs(locationStore);
onMounted(() => {
  locationStore.refresh();
});
</script>

<template>
  <!-- Loading Spinner -->
  <div v-if="status === 'pending'" class="flex justify-center items-center h-full">
    <span class="loading loading-infinity loading-xl text-primary" />
  </div>

  <!-- Locations List -->
  <div v-else-if="locations?.data?.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
    <div
      v-for="location in locations.data"
      :key="location.id"
      class="card w-96 bg-base-100 shadow-sm border border-base-300"
    >
      <div class="card-body">
        <!-- Top Badge -->
        <span class="badge badge-sm badge-primary normal-case whitespace-normal break-words max-w-full">
          {{ location.slug }}
        </span>

        <!-- Title & Lat/Long -->
        <div class="flex justify-between items-center">
          <h2 class="text-2xl font-bold text-primary">
            {{ location.name }}
          </h2>
          <div class="flex items-center gap-2 text-sm text-gray-500">
            <Icon name="tabler:map-pin" class="text-error size-4" />
            <span class="text-pretty">{{ location.lat.toFixed(2) }}, {{ location.long.toFixed(2) }}</span>
          </div>
        </div>

        <!-- Description -->
        <p class="mt-4 text-sm text-gray-600">
          {{ location.description }}
        </p>

        <!-- Feature-like list -->
        <ul class="mt-4 flex flex-col gap-2 text-sm">
          <li class="flex items-center">
            <Icon name="tabler:clock" class="text-success size-4 me-2" />
            <span>Created: {{ new Date(location.createdAt).toLocaleString() }}</span>
          </li>
        </ul>

        <!-- View button -->
        <div class="mt-6">
          <NuxtLink
            :to="`/dashboard/location/${location.slug}`"
            class="btn btn-primary btn-block"
          >
            <Icon name="tabler:eye" class="size-4 me-2" />
            View Details
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>

  <!-- Empty State -->
  <div v-else class="flex flex-col items-center justify-center gap-4 mt-10 text-center">
    <p class="text-lg text-gray-600">
      No locations found. Add a location to get started.
    </p>
    <NuxtLink to="/dashboard/add" class="btn btn-primary gap-2">
      <Icon name="tabler:circle-plus-filled" size="24" />
      Add Location
    </NuxtLink>
  </div>
</template>
