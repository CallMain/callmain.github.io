---
layout: doc
layoutClass: m-nav-layout
sidebar: false
prev: false
next: false
---

# 导航

<style src="./nav/nav.css"></style>
<script setup>
import { NavData } from './nav/navdata.js'
</script>
<NavLinks v-for="{title, items} in NavData" :title="title" :items="items"/>

