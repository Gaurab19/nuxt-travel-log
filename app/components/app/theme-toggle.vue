<script lang="ts" setup>
const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set(value: boolean) {
    colorMode.preference = value ? "dark" : "light";
  },
});
</script>

<template>
  <label class="swap swap-rotate">
    <!-- Toggle checkbox -->
    <input v-model="isDark" type="checkbox">

    <!-- Light Mode Icon (Sun) -->
    <Icon
      class="swap-on"
      name="tabler:sun"
      size="24"
    />

    <!-- Dark Mode Icon (Moon) -->
    <Icon
      class="swap-off"
      name="mdi:moon-waning-crescent"
      size="24"
    />
  </label>
</template>
