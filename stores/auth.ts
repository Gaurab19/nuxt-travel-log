import { createAuthClient } from "better-auth/client";
import { defineStore } from "pinia";

const authClient = createAuthClient();

export const useAuthStore = defineStore("useAuthStore", () => {
  const loading = ref(false);

  async function signIn(provider: string) {
    loading.value = true;
    try {
      await authClient.signIn.social({
        provider,
        callbackURL: "/dashboard",
        errorCallbackURL: "/error",
      });
    }
    finally {
      loading.value = false;
    }
  }

  return {
    loading,
    signIn,
  };
});
