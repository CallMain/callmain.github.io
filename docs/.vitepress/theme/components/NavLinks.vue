<template>
    <h2 v-if="title" :id="formatTitle" tabindex="-1">
        {{ title }}
        <a class="header-anchor" :href="`#${formatTitle}`" aria-hidden="true"></a>
    </h2>
    <div class="m-nav-links">
        <NavLink v-for="item in items" :noIcon="noIcon" v-bind="item" />
    </div>
</template>
<script setup>
import { computed } from 'vue'
import { slugify } from './util.js'
import NavLink from "./NavLink.vue";

const props = defineProps({
    title: {
      type: String
    },
    noIcon: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default: []
    }
})

const formatTitle = computed(() => {
  return slugify(props.title)
})
</script>
<style scoped>
.m-nav-links[data-v-4d3bce90] {
  --m-nav-gap: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  grid-row-gap: var(--m-nav-gap);
  grid-column-gap: var(--m-nav-gap);
  grid-auto-flow: row dense;
  justify-content: center;
  margin-top: var(--m-nav-gap);
}
@media (min-width: 500px) {
.m-nav-links[data-v-4d3bce90] {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
}
}
@media (min-width: 640px) {
.m-nav-links[data-v-4d3bce90] {
    grid-template-columns: repeat(auto-fill, minmax(155px, 1fr));
}
}
@media (min-width: 768px) {
.m-nav-links[data-v-4d3bce90] {
    grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
}
}
@media (min-width: 960px) {
.m-nav-links[data-v-4d3bce90] {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}
}
@media (min-width: 1440px) {
.m-nav-links[data-v-4d3bce90] {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
}
}
@media (min-width: 960px) {
.m-nav-links[data-v-4d3bce90] {
    --m-nav-gap: 20px;
}
}
</style>