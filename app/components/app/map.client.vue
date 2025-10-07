<script setup lang="ts">
import { LMap, LMarker, LTileLayer } from "@vue-leaflet/vue-leaflet";
import { computed } from "vue";

import { CENTER_NEPAL } from "../../../lib/constants";
import { useMapStore } from "../../../stores/map";
import "leaflet/dist/leaflet.css";

// Props
const props = defineProps({
  center: {
    type: Array as () => [number, number],
    default: () => CENTER_NEPAL,
  },
  zoom: {
    type: Number,
    default: 12,
  },
  height: {
    type: String,
    default: "350px",
  },
  attributionLight: {
    type: String,
    default: "&copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors",
  },
  attributionDark: {
    type: String,
    default:
      "&copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors &copy; CARTO",
  },
  tileUrlLight: {
    type: String,
    default: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  },
  tileUrlDark: {
    type: String,
    default:
      "https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png",
  },
  minZoom: {
    type: Number,
    default: 1,
  },
  maxZoom: {
    type: Number,
    default: 19,
  },
  showAllLocation: {
    type: Boolean,
    default: true,
  },
  specificPoints: {
    type: Array as () => { lat: number; long: number }[],
    default: () => [],
  },
});

// Store
const mapStore = useMapStore();
const colorMode = useColorMode();

// Dynamic values
const tileUrl = computed(() =>
  colorMode.value === "dark" ? props.tileUrlDark : props.tileUrlLight,
);
const attribution = computed(() =>
  colorMode.value === "dark" ? props.attributionDark : props.attributionLight,
);
</script>

<template>
  <ClientOnly>
    <LMap
      :style="{ height: props.height }"
      :zoom="props.zoom"
      :center="props.center"
      :use-global-leaflet="false"
    >
      <LTileLayer
        :url="tileUrl"
        :attribution="attribution"
        layer-type="base"
        name="Basemap"
        :min-zoom="props.minZoom"
        :max-zoom="props.maxZoom"
      />

      <!-- Markers from map store -->
      <div v-if="props.showAllLocation">
        <LMarker
          v-for="point in mapStore.mapPoints"
          :key="point.id"
          :lat-lng="[point.lat, point.long]"
          :draggable="false"
        />
      </div>
      <div v-else>
        <LMarker
          v-for="point in props.specificPoints"
          :key="point.lat || point.long"
          :lat-lng="[point.lat, point.long]"
          :draggable="false"
        />
      </div>
    </LMap>
  </ClientOnly>
</template>

<style scoped>
.leaflet-control,
.leaflet-container a {
  color: white;
}
</style>
