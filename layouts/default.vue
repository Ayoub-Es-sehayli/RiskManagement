<template>
  <div class="base">
    <nuxt-link class="logo" to="/"
      ><img src="~/assets/logo.png" alt="LOGO"
    /></nuxt-link>
    <div class="title">
      {{ title }}
    </div>
    <div class="nav">
      <navigation />
    </div>
    <div class="content">
      <nuxt />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import { store } from "@/store/index";
import UiModule from "@/store/uiModule";

@Component
export default class Default extends Vue {
  uiModule!: UiModule;

  created() {
    this.uiModule = getModule(UiModule, store);
  }

  get title() {
    return this.uiModule.pageTitle;
  }
}
</script>

<style scoped>
.base {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: 100px 100px 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas:
    "logo title"
    "logo content"
    "nav content";
}

.title {
  justify-self: center;
  align-self: center;
  grid-area: title;
}

.content {
  grid-area: content;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-auto-rows: 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas: ".";
}

.logo {
  grid-area: logo;
}

.nav {
  justify-self: stretch;
  grid-area: nav;
}
</style>