<script setup lang="ts">
import type { FetchError } from "ofetch";

import { toTypedSchema } from "@vee-validate/zod";

import { LocationInsertSchema } from "../../../lib/db/schema/location";

const router = useRouter();

const submitError = ref("");
const loading = ref(false);
const submitted = ref(false);

const { handleSubmit, errors, meta, setErrors } = useForm({ validationSchema: toTypedSchema(LocationInsertSchema,
) });
const onSubmit = handleSubmit(async (values) => {
  try {
    loading.value = true;
    submitError.value = "";
    const res = await $fetch("/api/location", {
      method: "POST",
      body: values,
    });
    console.warn(res);
    submitted.value = true;
    navigateTo("/dashboard");
  }
  catch (error) {
    const e = error as FetchError;
    if (e.data?.data) {
      setErrors(e.data?.data);
    }
    submitError.value = e.statusMessage || "An error occurred";
  }
  finally {
    loading.value = false;
  }
});
onBeforeRouteLeave(() => {
  if (meta.value.dirty && !submitted.value) {
    // eslint-disable-next-line no-alert
    const confirmLeave = window.confirm("You have unsaved changes. Are you sure you want to leave?");
    if (!confirmLeave) {
      return false;
    }
  }
  return true;
});
</script>

<template>
  <div class="container max-w-md mx-auto">
    <div class="my-4">
      <h1 class="text-lg">
        Add Location
      </h1>
      <p class="text-sm">
        A Location is a place you have traveled to or wish to travel to. It can be a city, country, state or point of interest. You can add specific times you visited this location after adding it.
      </p>
    </div>
    <div
      v-if="submitError"
      role="alert"
      class="alert alert-error"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{{ submitError }}</span>
    </div>
    <form class="flex flex-col gap-2" @submit.prevent="onSubmit">
      <AppFormField
        label="Name"
        type="text"
        name="name"
        :error="errors.name"
        :disabled="loading"
      />
      <AppFormField
        label="Description"
        type="textarea"
        name="description"
        :error="errors.description"
        :disabled="loading"
      />
      <AppFormField
        label="Latitude"
        type="number"
        name="lat"
        :error="errors.lat"
        :disabled="loading"
      />
      <AppFormField
        label="Longitude"
        type="number"
        name="long"
        :error="errors.long"
        :disabled="loading"
      />
      <div class="flex justify-center gap-4 mt-4">
        <button
          class="btn btn-outline"
          type="button"
          :disabled="loading"
          @click="router.back()"
        >
          <Icon
            name="tabler:arrow-left"
          />
          Cancel
        </button>
        <button
          class="btn btn-primary"
          type="submit"
          :disabled="loading"
        >
          <span v-if="loading" class="loading loading-spinner" />
          <Icon
            v-else
            name="tabler:circle-plus-filled"
          />
          Add
        </button>
      </div>
    </form>
  </div>
</template>
