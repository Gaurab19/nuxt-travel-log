<script setup lang="ts">
import { useAuthStore } from "../../stores/auth";

const authStore = useAuthStore();
</script>

<template>
  <div class="container mx-auto hero bg-base-300 mt-4">
    <div class="hero-content text-center min-h-96">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">
          Hello there
        </h1>
        <p class="py-6">
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
          quasi. In deleniti eaque aut repudiandae et a id nisi.
        </p>
        <div class="grid gap-3">
          <auth-button v-if="!authStore?.user" :show-text="true" />
          <NuxtLink
            v-else
            to="/dashboard"
            class="btn btn-primary"
          >
            Continue to Dashboard
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
