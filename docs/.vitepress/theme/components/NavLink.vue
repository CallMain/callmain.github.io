<template>
    <a v-if="link" class="m-nav-link" :href="link" target="_blank" rel="noreferrer">
    <article class="box" :class="{ 'has-badge': formatBadge }">
      <div class="box-header">
        <template v-if="!noIcon">
          <div v-if="svg" class="icon" v-html="svg"></div>
          <div v-else-if="icon && typeof icon === 'string'" class="icon">
            <img
              :src="withBase(icon)"
              :alt="title"
              onerror="this.parentElement.style.display='none'"
            />
          </div>
        </template>
        <h5 v-if="title" :id="formatTitle" class="title" :class="{ 'no-icon': noIcon }">
          {{ title }}
        </h5>
      </div>
      <Badge v-if="formatBadge" class="badge" :type="formatBadge.type" :text="formatBadge.text" />
      <p v-if="desc" class="desc">{{ desc }}</p>
    </article>
  </a>
</template>
<script setup>
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { slugify } from './util.js'

const props = defineProps({
  noIcon: Boolean,
  icon: String,
  badge: String,
  title: String,
  desc: String,
  link: String
})

const formatTitle = computed(() => {
  if (!props.title) {
    return ''
  }
  return slugify(props.title)
})

const svg = computed(() => {
  if (typeof props.icon === 'object') return props.icon.svg
  return ''
})

const formatBadge = computed(() => {
  if (typeof props.badge === 'string') {
    return { text: props.badge, type: 'info' }
  }
  return props.badge
})
</script>
<style scoped>
.m-nav-link[data-v-474c5731] {
  --m-nav-icon-box-size: 50px;
  --m-nav-icon-size: 45px;
  --m-nav-box-gap: 12px;
  display: block;
  border: 1px solid var(--vp-c-bg-soft);
  border-radius: 12px;
  height: 100%;
  background-color: var(--vp-c-bg-soft);
  transition: all 0.25s;
}
.m-nav-link[data-v-474c5731]:hover {
  box-shadow: var(--vp-shadow-2);
  text-decoration: initial;
  background-color: var(--vp-c-bg-soft-up);
  transform: translateY(-5px);
}
.m-nav-link .box[data-v-474c5731] {
  display: flex;
  flex-direction: column;
  position: relative;
  padding: var(--m-nav-box-gap);
  height: 100%;
  color: var(--vp-c-text-1);
}
.m-nav-link .box.has-badge[data-v-474c5731] {
  padding-top: calc(var(--m-nav-box-gap) + 2px);
}
.m-nav-link .box-header[data-v-474c5731] {
  display: flex;
  align-items: center;
}
.m-nav-link .icon[data-v-474c5731] {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: calc(var(--m-nav-box-gap) - 2px);
  border-radius: 6px;
  width: var(--m-nav-icon-box-size);
  height: var(--m-nav-icon-box-size);
  font-size: var(--m-nav-icon-size);
  background-color: var(--vp-c-bg-soft-down);
  transition: background-color 0.25s;
}
.m-nav-link .icon[data-v-474c5731] svg {
  width: var(--m-nav-icon-size);
  fill: currentColor;
}
.m-nav-link .icon[data-v-474c5731] img {
  border-radius: 4px;
  width: var(--m-nav-icon-size);
}
.m-nav-link .title[data-v-474c5731] {
  overflow: hidden;
  flex-grow: 1;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 16px;
  font-weight: 600;
}
.m-nav-link .title[data-v-474c5731]:not(.no-icon) {
  line-height: var(--m-nav-icon-box-size);
}
.m-nav-link .badge[data-v-474c5731] {
  position: absolute;
  top: 2px;
  right: 0;
  transform: scale(0.8);
}
.m-nav-link .desc[data-v-474c5731] {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-grow: 1;
  margin: calc(var(--m-nav-box-gap) - 2px) 0 0;
  line-height: 1.5;
  font-size: 12px;
  color: var(--vp-c-text-2);
}
@media (max-width: 960px) {
.m-nav-link[data-v-474c5731] {
    --m-nav-icon-box-size: 36px;
    --m-nav-icon-size: 20px;
    --m-nav-box-gap: 8px;
}
.m-nav-link .title[data-v-474c5731] {
    font-size: 14px;
}
}
</style>