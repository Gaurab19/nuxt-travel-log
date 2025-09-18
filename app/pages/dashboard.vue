<script setup lang="ts">
const isSideBarOpen = ref(true);
function toggleSidebar() {
  isSideBarOpen.value = !isSideBarOpen.value;
  localStorage.setItem("isSideBarOpen", isSideBarOpen.value.toString());
}
onMounted(() => {
  const storedValue = localStorage.getItem("isSideBarOpen");
  isSideBarOpen.value = JSON.parse(storedValue);
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
        <div class="divider" />
        <SidebarButton
          title="Sign Out"
          redirect-link="/sign-out"
          icon="tabler:logout-2"
          :is-side-bar-open="isSideBarOpen"
        />
      </div>
    </div>
    <div class="flex-1">
      <NuxtPage />
    </div>
  </div>
</template>
