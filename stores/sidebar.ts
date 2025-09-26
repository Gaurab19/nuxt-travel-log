export type SidebarButton = {
  id: string;
  label: string;
  icon: string;
  href: string;
};
export const useSideBarStore = defineStore("useSideBarStore", () => {
  const sideBarItems = ref<SideBarItem[]>([]);
  const loading = ref(false);
  return {
    loading,
    sideBarItems,
  };
});
