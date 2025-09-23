import { createAuthClient } from "better-auth/vue";
import { defineStore } from "pinia";

const authClient = createAuthClient();

export const useAuthStore = defineStore("useAuthStore", () => {
  const session = authClient.useSession();
  // const session = ref<Awaited<ReturnType<typeof authClient.useSession>> | null>(null);

  async function init() {
    const data = await authClient.useSession();
    // const data = await authClient.useSession(useFetch);
    session.value = data;
  }

  const user = computed(() => session.value?.data?.user);
  const loading = computed(() => session.value?.isPending);

  async function signIn(provider: string) {
    try {
      await authClient.signIn.social({
        provider,
        callbackURL: "/dashboard",
        errorCallbackURL: "/error",
      });
    }
    catch (e) {
      console.error(e);
    }
  }
  async function signOut() {
    try {
      await authClient.signOut();
      navigateTo("/");
    }
    catch (e) {
      console.error(e);
    }
  }
  return {
    loading,
    signIn,
    signOut,
    user,
    init,
  };
});
