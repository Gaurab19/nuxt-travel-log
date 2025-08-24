<script lang="ts" setup>
import { useAuthStore } from "../../stores/auth"; // adjust path

const props = defineProps<{
  showText?: boolean;
}>();

const authStore = useAuthStore();

const providers = ref([
  { name: "github", label: "GitHub", icon: "tabler:brand-github", color: "accent" },
  { name: "linkedin", label: "LinkedIn", icon: "tabler:brand-linkedin", color: "primary" },
  { name: "google", label: "Gmail", icon: "tabler:brand-google", color: "error" },
  { name: "twitter", label: "Twitter", icon: "tabler:brand-twitter", color: "info" },
]);

function buttonClasses(color: string): string {
  return [
    `btn btn-${color} tooltip flex items-center transition-all duration-200`,
    props.showText ? "" : "btn-circle",
    authStore.loading ? "opacity-70 cursor-not-allowed" : "",
  ].join(" ");
}

async function signIn(providerName: string) {
  if (authStore.loading)
    return; // prevent double-click
  await authStore.signIn(providerName);
}
</script>

<template>
  <div class="flex space-x-4">
    <div
      v-for="provider in providers"
      :key="provider.name"
      class="tooltip tooltip-bottom"
      :data-tip="`Sign in with ${provider.label}`"
    >
      <button
        :class="buttonClasses(provider.color)"
        :aria-label="`Sign in with ${provider.label}`"
        :disabled="authStore.loading"
        @click="signIn(provider.name)"
      >
        <!-- icon or spinner -->
        <template v-if="authStore.loading">
          <span class="loading loading-spinner w-5 h-5" />
        </template>
        <template v-else>
          <icon :name="provider.icon" size="24" />
        </template>

        <!-- text -->
        <span v-if="props.showText" class="ml-2">
          {{ provider.label }}
        </span>
      </button>
    </div>
  </div>
</template>
