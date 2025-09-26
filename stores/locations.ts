import { useSideBarStore } from "./sidebar";

export const useLocationStore = defineStore("useLocationStore", () => {
  const sideBarStore = useSideBarStore();
  const { data, status, refresh } = useFetch("/api/location", {
    lazy: true,
  });

  watchEffect(() => {
    if (data?.value?.data) {
      sideBarStore.loading = false;
      sideBarStore.sideBarItems = data.value.data.map((location: any) => ({
        id: location.id,
        label: location.name,
        icon: "tabler:map-pin-filled",
        href: `/dashboard/location/${location.slug}`,
      }));
    }
    sideBarStore.loading = status.value === "pending";
  });
  return {
    locations: data,
    status,
    refresh,
  };
});
