<script setup lang="ts">
const props = defineProps<{
  label: string;
  type?: string;
  name: string;
  modelValue?: string | number;
  error?: string;
  disabled?: boolean;
}>();
</script>

<template>
  <fieldset class="fieldset">
    <legend class="fieldset-legend">
      {{ props.label }}
    </legend>
    <Field
      :as="props.type === 'textarea' ? 'textarea' : 'input'"
      :type="props.type !== 'textarea' ? props.type : undefined"
      class="w-full"
      :name="props.name"
      :class="{ 'input-error': props?.error, 'input': props.type === 'text' || props.type === 'number', 'textarea': props.type === 'textarea' }"
      :disabled="props?.disabled"
    />
    <p v-if="props?.error" class="fieldset-label text-error">
      {{ props.error }}
    </p>
  </fieldset>
</template>
