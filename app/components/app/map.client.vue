<script setup lang="ts">
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";

import { CENTER_NEPAL } from "../../../lib/constants";
import { useMapStore } from "../../../stores/map";
import "leaflet/dist/leaflet.css";

const colorMode = useColorMode();
const mapStore = useMapStore();

const attributionLight = "&copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors";
const attributionDark = "&copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors &copy; CARTO";

const lightUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const darkUrlCarto = "https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png";

const tileUrl = computed(() => colorMode.value === "dark" ? darkUrlCarto : lightUrl);
const attribution = computed(() => colorMode.value === "dark" ? attributionDark : attributionLight);
</script>

<template>
  <LMap
    style="height: 350px"
    :zoom="12"
    :center="CENTER_NEPAL"
    :use-global-leaflet="false"
  >
    <LTileLayer
      :url="tileUrl"
      :attribution="attribution"
      layer-type="base"
      name="Basemap"
      :max-zoom="19"
      :min-zoom="1"
    />
    <LMarker
      v-for="point in mapStore.mapPoints"
      :key="point.id"
      :lat-lng="[point.lat, point.long]"
      :draggable="false"
    />
  </LMap>
</template>

<style scoped>
.leaflet-control,
.leaflet-container a {
  color: white;
}
</style>
