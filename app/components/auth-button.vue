<script lang="ts" setup>
import { useAuthStore } from "../../stores/auth"; // adjust path

const props = defineProps<{
  showText?: boolean;
}>();

const authStore = useAuthStore();
const activeProvider = ref<string | null>(null);

const providers = ref([
  { name: "github", label: "GitHub", icon: "tabler:brand-github", color: "accent" },
  // { name: "linkedin", label: "LinkedIn", icon: "tabler:brand-linkedin", color: "primary" },
  { name: "google", label: "Gmail", icon: "tabler:brand-google", color: "error" },
  // { name: "twitter", label: "Twitter", icon: "tabler:brand-twitter", color: "info" },
]);

function buttonClasses(color: string): string {
  return [
    `btn btn-${color} tooltip flex items-center transition-all duration-200`,
    props.showText ? "" : "btn-circle",
    authStore.loading ? "opacity-70 cursor-not-allowed" : "",
  ].join(" ");
}

async function signIn(providerName: string) {
  if (activeProvider.value)
    return;
  activeProvider.value = providerName;

  try {
    await authStore.signIn(providerName);
  }
  finally {
    activeProvider.value = null;
  }
}
</script>

<template>
  <div v-if="!authStore.loading && authStore.user" class="dropdown dropdown-end dropdown-buttom">
    <div
      tabindex="0"
      role="button"
      class="btn m-1"
    >
      <div v-if="authStore?.user?.image" class="avatar">
        <div class="w-8 h-8 rounded-full overflow-hidden">
          <img
            :src="authStore.user.image"
            :alt="authStore?.user?.name"
            class="w-full h-full object-cover"
          >
        </div>
      </div>
      {{ authStore.user.name }}
    </div>
    <ul
      v-if="!showText"
      tabindex="0"
      class="dropdown-content menu bg-primary text-white rounded-box z-1 w-52 p-2 shadow-sm"
    >
      <li>
        <NuxtLink to="/sign-out">
          <Icon name="tabler:logout-2" size="24" />
          Sign Out
        </NuxtLink>
      </li>
    </ul>
  </div>
  <div
    v-else
    class="flex gap-2 justify-center"
    :disabled="authStore.loading"
  >
    <div
      v-for="provider in providers"
      :key="provider.name"
      class="tooltip tooltip-bottom"
      :data-tip="`Sign in with ${provider.label}`"
    >
      <button
        :class="buttonClasses(provider.color)"
        :aria-label="`Sign in with ${provider.label}`"
        :disabled="activeProvider === provider.name"
        @click="signIn(provider.name)"
      >
        <!-- icon or spinner -->
        <template v-if="activeProvider === provider.name">
          <span class="loading loading-infinity w-5 h-5" />
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
