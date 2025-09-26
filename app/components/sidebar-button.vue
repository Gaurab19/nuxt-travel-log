<script setup lang="ts">
const props = defineProps<{
  title: string;
  redirectLink: string;
  icon: string;
  isSideBarOpen: boolean;
}>();

const route = useRoute();
</script>

<template>
  <NuxtLink
    :to="props.redirectLink"
    :class="{
      'bg-base-300': route.path === props.redirectLink,
      'justify-start': props.isSideBarOpen,
      'justify-center': !props.isSideBarOpen,
    }"
    class="tooltip tooltip-right btn btn-ghost rounded-none hover:cursor-pointer flex no-wrap"
    :data-tip="props.title"
  >
    <Icon :name="props.icon" size="24" />
    <Transition name="fade">
      <span v-if="props.isSideBarOpen" class="text-wrap">{{ props.title }}</span>
    </Transition>
  </NuxtLink>
</template>

<style scoped>
.fade-enter-active {
  animation: fade-in 0.2s forwards;
}
.fade-leave-active {
  animation: fade-out 0.2s forwards;
}

@keyframes fade-in {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes fade-out {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
}
</style>
