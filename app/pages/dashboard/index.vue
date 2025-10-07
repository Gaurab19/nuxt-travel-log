<script setup lang="ts">
import { useLocationStore } from "../../../stores/locations";

const locationStore = useLocationStore();
const { locations, status } = storeToRefs(locationStore);

const selectedLocation = ref<any>(null);
const modalRef = ref<HTMLDialogElement | null>(null);

onMounted(() => {
  locationStore.refresh();
});

function openModal(location: any) {
  selectedLocation.value = location;
  modalRef.value?.showModal();
}

function closeModal() {
  modalRef.value?.close();
  selectedLocation.value = null;
}
</script>

<template>
  <div>
    <!-- Modal -->
    <dialog
      id="location_modal"
      ref="modalRef"
      class="modal"
    >
      <div class="modal-box max-w-2xl bg-base-100 shadow-xl border border-base-300">
        <form method="dialog">
          <button
            class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            @click="closeModal"
          >
            ✕
          </button>
        </form>

        <div v-if="selectedLocation" class="space-y-4 mt-2">
          <!-- Title -->
          <h3 class="text-2xl font-bold text-primary flex items-center gap-2">
            <Icon name="tabler:map" class="text-accent size-6" />
            {{ selectedLocation.name }}
          </h3>

          <!-- Slug -->
          <div class="badge badge-outline badge-primary normal-case">
            {{ selectedLocation.slug }}
          </div>

          <!-- Description -->
          <p class="text-gray-700 text-sm leading-relaxed">
            {{ selectedLocation.description }}
          </p>

          <!-- Coordinates -->
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-base-200 p-3 rounded-lg">
              <span class="font-semibold text-gray-600">Latitude:</span>
              <p class="text-primary">
                {{ selectedLocation.lat }}
              </p>
            </div>
            <div class="bg-base-200 p-3 rounded-lg">
              <span class="font-semibold text-gray-600">Longitude:</span>
              <p class="text-primary">
                {{ selectedLocation.long }}
              </p>
            </div>
          </div>

          <!-- App Map -->
          <ClientOnly>
            <AppMap
              class="h-96 w-full"
              :specific-points="[{ lat: selectedLocation.lat, long: selectedLocation.long }]"
              :show-all-location="false"
              :center="[selectedLocation.lat, selectedLocation.long]"
            />
          </ClientOnly>

          <!-- Meta Info -->
          <div class="mt-4 text-sm text-gray-500">
            <p>Created: {{ new Date(selectedLocation.createdAt).toLocaleString() }}</p>
            <p>Updated: {{ new Date(selectedLocation.updatedAt).toLocaleString() }}</p>
          </div>

          <!-- Actions -->
          <div class="modal-action mt-6">
            <button class="btn" @click="closeModal">
              Close
            </button>
          </div>
        </div>
      </div>
    </dialog>

    <!-- Loading Spinner -->
    <div v-if="status === 'pending'" class="flex justify-center items-center h-full">
      <span class="loading loading-infinity loading-xl text-primary" />
    </div>

    <!-- Locations List -->
    <div
      v-else-if="locations?.data?.length"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 overflow-y-auto"
    >
      <div
        v-for="location in locations.data"
        :key="location.id"
        class="card w-full bg-base-100 shadow-md border border-base-300 hover:shadow-lg transition-all"
      >
        <div class="card-body">
          <!-- Badge -->
          <span class="badge badge-sm badge-primary normal-case whitespace-normal break-words max-w-full">
            {{ location.slug }}
          </span>

          <!-- Title -->
          <div class="flex justify-between items-center">
            <h2 class="text-2xl font-bold text-primary">
              {{ location.name }}
            </h2>
            <div class="flex items-center gap-2 text-sm text-gray-500">
              <Icon name="tabler:map-pin" class="text-error size-4" />
              <span>{{ location.lat.toFixed(2) }}, {{ location.long.toFixed(2) }}</span>
            </div>
          </div>

          <!-- Description -->
          <p class="mt-3 text-sm text-gray-600 line-clamp-2">
            {{ location.description }}
          </p>

          <!-- Created At -->
          <div class="text-xs text-gray-500 mt-3 flex items-center gap-2">
            <Icon name="tabler:clock" class="text-success size-4" />
            <span>Created: {{ new Date(location.createdAt).toLocaleString() }}</span>
          </div>

          <!-- View Details Button -->
          <div class="mt-6">
            <button class="btn btn-primary btn-block" @click="openModal(location)">
              <Icon name="tabler:eye" class="size-4 me-2" />
              View Details
            </button>
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
  </div>
</template>
