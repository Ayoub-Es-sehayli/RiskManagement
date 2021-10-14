<template>
  <div class="form">
    <b-field label="Risque de" class="risk-name">
      <b-input v-model="identification.riskName" />
    </b-field>
    <b-field label="Suite à" class="risk-cause">
      <b-input v-model="identification.riskCause" />
    </b-field>
    <b-field label="Processus" class="process">
      <b-select v-model="identification.process" expanded></b-select>
    </b-field>
    <b-field label="Marco-Processus" class="macro-process">
      <b-input disabled />
    </b-field>
    <b-field label="Domaine" class="domain">
      <b-input disabled />
    </b-field>
    <div class="impacts-others">
      <b-field class="impact_switch">
        <b-switch v-model="identification.impacts_others">
          Impacts sur d'autre entité
        </b-switch>
      </b-field>
      <b-field class="entities" v-if="identification.impacts_others">
        <b-taginput
          v-model="identification.impacted_entities"
          field="entity.name"
          icon="label"
        />
      </b-field>
    </div>
    <div class="causes">
      <b-field label="Causes">
        <b-field
          grouped
          v-for="(cause, index) in identification.causes"
          :key="index"
        >
          <b-input expanded v-model="cause.cause" maxlength="100" />
          <b-button
            :icon-left="causeIcon(index)"
            @click="causeAction(index)"
          ></b-button>
        </b-field>
      </b-field>
    </div>
    <b-field label="Description" class="description">
      <b-input
        v-model="identification.description"
        type="textarea"
        maxlength="500"
      />
    </b-field>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IdentificationVM } from "~/types/RiskFormVM";

@Component
export default class RiskIdentificationStep extends Vue {
  @Prop({ required: true })
  identification!: IdentificationVM;

  causeIcon(index: number) {
    if (index == this.identification.causes.length - 1) {
      return "plus";
    } else {
      return "minus";
    }
  }
  causeAction(index: number) {
    if (index == this.identification.causes.length - 1) {
      this.addCause();
    } else {
      this.removeCause(index);
    }
  }
  addCause() {
    this.identification.causes.push({
      cause: "",
    });
  }
  removeCause(index: number) {
    this.identification.causes.splice(index, 1);
  }
}
</script>
<style scoped>
.form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(5, 80px) 1fr;
  grid-auto-rows: 1fr;
  gap: 1% 5%;
  grid-auto-flow: row;
  grid-template-areas:
    "risk-name process "
    "risk-cause macro-process"
    "impacts-others domain"
    "description causes"
    "description causes";
}

.risk-name {
  grid-area: risk-name;
}

.risk-cause {
  grid-area: risk-cause;
}

.process {
  grid-area: process;
}

.macro-process {
  grid-area: macro-process;
}

.domain {
  grid-area: domain;
}

.impacts-others {
  grid-area: impacts-others;
}

.causes {
  grid-area: causes;
  align-self: stretch;
}

.description {
  grid-area: description;
}
</style>