<template>
  <div class="navigation">
    <b-button
      tag="router-link"
      type="is-success is-light is-link"
      to="/risk/form"
      >Identifier Risque</b-button
    >
    <b-button
      tag="router-link"
      type="is-success is-light is-link"
      to="/actor/form"
      >Identifier Acteurs Risques</b-button
    >
    <b-button tag="router-link" type="is-success is-light is-link" to="/process"
      >Cartographie <br />des processus</b-button
    >
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Navigation extends Vue {}
</script>

<style scoped>
.navigation {
  display: grid;
  grid-template-columns: 200px;
  grid-auto-rows: 40px;
  gap: 10% 0px;
  grid-auto-flow: row;
  grid-template-areas:
    "."
    ".";
}
</style>