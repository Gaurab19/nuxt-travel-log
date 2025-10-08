<script setup lang="ts">
import { useLocationStore } from "~~/stores/locations";
import { useSideBarStore } from "~~/stores/sidebar";

const useSidebarStore = useSideBarStore();
const locationStore = useLocationStore();

const route = useRoute();
const config = useRuntimeConfig();
console.warn("current build version: ", config.public.appVersion);
const isSideBarOpen = useCookie<boolean>("isSideBarOpen", {
  default: () => true,
  watch: true,
});
function toggleSidebar() {
  isSideBarOpen.value = !isSideBarOpen.value;
}
onMounted(() => {
  if (route.path !== "/dashboard") {
    locationStore.refresh();
  }
});
</script>

<template>
  <div class="flex flex-1">
    <div class="bg-base-200 transition-all duration-300 ease-in-out" :class="isSideBarOpen ? 'w-64' : 'w-16'">
      <div
        class="flex hover:cursor-pointer hover:bg-base-200 p-2"
        :class="isSideBarOpen ? 'justify-end' : 'justify-center'"
        @click="toggleSidebar()"
      >
        <Icon :name="isSideBarOpen ? 'tabler:chevron-left' : 'tabler:chevron-right'" size="32" />
      </div>
      <div class="flex flex-col gap-2">
        <SidebarButton
          title="Dashboard"
          redirect-link="/dashboard"
          icon="tabler:layout-dashboard"
          :is-side-bar-open="isSideBarOpen"
        />
        <SidebarButton
          title="Add Location"
          redirect-link="/dashboard/add"
          icon="tabler:circle-plus-filled"
          :is-side-bar-open="isSideBarOpen"
        />
        <ClientOnly>
          <div v-if="useSidebarStore?.loading || useSidebarStore?.sideBarItems?.length" class="divider" />
          <div v-if="useSidebarStore?.loading" class="px-4">
            <div class="skeleton h-4 w-full" />
          </div>
          <div v-if="!useSidebarStore?.loading && useSidebarStore?.sideBarItems?.length" class="flex flex-col">
            <SidebarButton
              v-for="item in useSidebarStore.sideBarItems"
              :key="item.id"
              :title="item.label"
              redirect-link="/dashboard"
              :icon="item.icon"
              :is-side-bar-open="isSideBarOpen"
            />
          </div>
          <template #fallback>
            <div class="divider" />
            <div class="px-4">
              <div class="skeleton h-4 w-full" />
            </div>
          </template>
        </ClientOnly>
        <div class="divider" />
        <SidebarButton
          title="Sign Out"
          redirect-link="/sign-out"
          icon="tabler:logout-2"
          :is-side-bar-open="isSideBarOpen"
        />
      </div>
    </div>
    <div class="flex-1 flex flex-col">
      <div v-if="route.path === '/dashboard'" class="flex-1 flex flex-col">
        <!-- Top Navbar -->
        <header class="bg-base-100 shadow-sm px-6 py-3 flex items-center justify-between border-b border-base-300">
          <h1 class="text-xl font-semibold text-primary flex items-center gap-2">
            <Icon name="tabler:home" class="text-error size-8 me-2" />
            Dashboard
          </h1>
        </header>
      </div>
      <NuxtPage />
      <AppMap class="h-[400px] mt-6" :show-all-location="true" />
    </div>
  </div>
</template>
