<template>
  <div class="form">
    <div class="control_levels">
      <div class="control_levels_efficency">
        <b-field label="Contrôle de 1er et 2nd nivaux existants">
          <b-select v-model="evaluation.control_levels_efficency">
            <option :value="0">Non Applicable</option>
            <option :value="5">Efficace</option>
            <option :value="4">Moyen</option>
            <option :value="3">Insuffisant</option>
            <option :value="2">Inefficace</option>
            <option :value="1">Inexistant</option>
          </b-select>
        </b-field>
      </div>
      <div class="control_levels_description">
        <b-field label="Description" label-position="on-border">
          <b-input
            v-model="evaluation.control_levels_description"
            maxlength="200"
            type="textarea"
          ></b-input>
        </b-field>
      </div>
    </div>
    <div class="control_auto">
      <div class="control_auto_efficency">
        <b-field label="Contrôles automatiques existants">
          <b-select v-model="evaluation.control_auto_efficency">
            <option :value="0">Non Applicable</option>
            <option :value="5">Efficace</option>
            <option :value="4">Moyen</option>
            <option :value="3">Insuffisant</option>
            <option :value="2">Inefficace</option>
            <option :value="1">Inexistant</option>
          </b-select>
        </b-field>
      </div>
      <div class="control_auto_description">
        <b-field label="Description" label-position="on-border">
          <b-input
            v-model="evaluation.control_auto_description"
            maxlength="200"
            type="textarea"
          ></b-input>
        </b-field>
      </div>
    </div>
    <div class="procedure_circular">
      <div class="procedure_circular_efficency">
        <b-field label="Procédures & circulaires">
          <b-select v-model="evaluation.procedure_circular_efficency">
            <option :value="0">Non Applicable</option>
            <option :value="5">Efficace</option>
            <option :value="4">Moyen</option>
            <option :value="3">Insuffisant</option>
            <option :value="2">Inefficace</option>
            <option :value="1">Inexistant</option>
          </b-select>
        </b-field>
      </div>
      <div class="procedure_circular_description">
        <b-field label="Description" label-position="on-border">
          <b-input
            v-model="evaluation.procedure_circular_description"
            maxlength="200"
            type="textarea"
          ></b-input>
        </b-field>
      </div>
    </div>
    <div class="sensibilisation_formation">
      <div class="sensibilisation_formation_efficency">
        <b-field label="Sensibilisation et formation">
          <b-select v-model="evaluation.sensibilisation_formation_efficency">
            <option :value="0">Non Applicable</option>
            <option :value="5">Efficace</option>
            <option :value="4">Moyen</option>
            <option :value="3">Insuffisant</option>
            <option :value="2">Inefficace</option>
            <option :value="1">Inexistant</option>
          </b-select>
        </b-field>
      </div>
      <div class="sensibilisation_formation_description">
        <b-field label="Description" label-position="on-border">
          <b-input
            v-model="evaluation.sensibilisation_formation_description"
            maxlength="200"
            type="textarea"
          ></b-input>
        </b-field>
      </div>
    </div>
    <input type="hidden" :value="calculateDmrGlobal" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { EvaluationResiduelVM } from "~/types/RiskFormVM";

@Component
export default class RiskEvaluationResiduelStep extends Vue {
  @Prop()
  evaluation!: EvaluationResiduelVM;

  @Prop()
  dmrGlobal!: number;

  get calculateDmrGlobal() {
    const sum =
      this.evaluation.control_levels_efficency +
      this.evaluation.control_auto_efficency +
      this.evaluation.procedure_circular_efficency +
      this.evaluation.sensibilisation_formation_efficency;

    let value = Math.round(sum / 4);
    this.$emit("update:dmr-global", value);
    return value;
  }
}
</script>

<style scoped>
.form {
  display: grid;
  grid-template-columns: 0.92fr 0.7fr 1fr;
  grid-template-rows: repeat(4, 135px);
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas:
    "control_levels control_levels control_levels"
    "control_auto control_auto control_auto"
    "procedure_circular procedure_circular procedure_circular"
    "sensibilisation_formation sensibilisation_formation sensibilisation_formation";
}

.control_levels {
  display: grid;
  grid-template-columns: 0.7fr 1.3fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas: "control_levels_efficency control_levels_description";
  grid-area: control_levels;
}

.control_levels_efficency {
  align-self: center;
  grid-area: control_levels_efficency;
}

.control_levels_description {
  align-self: center;
  justify-self: stretch;
  grid-area: control_levels_description;
}

.control_auto {
  display: grid;
  grid-template-columns: 0.7fr 1.3fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas: "control_auto_efficency control_auto_description";
  grid-area: control_auto;
}

.control_auto_efficency {
  justify-self: stretch;
  align-self: center;
  grid-area: control_auto_efficency;
}

.control_auto_description {
  align-self: center;
  grid-area: control_auto_description;
}

.procedure_circular {
  display: grid;
  grid-template-columns: 0.7fr 1.3fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas: "procedure_circular_efficency procedure_circular_description";
  grid-area: procedure_circular;
}

.procedure_circular_efficency {
  align-self: center;
  grid-area: procedure_circular_efficency;
}

.procedure_circular_description {
  align-self: center;
  grid-area: procedure_circular_description;
}

.sensibilisation_formation {
  display: grid;
  grid-template-columns: 0.7fr 1.3fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas: "sensibilisation_formation_efficency sensibilisation_formation_description";
  grid-area: sensibilisation_formation;
}

.sensibilisation_formation_efficency {
  align-self: center;
  grid-area: sensibilisation_formation_efficency;
}

.sensibilisation_formation_description {
  align-self: center;
  grid-area: sensibilisation_formation_description;
}

.dmr_global {
  justify-self: center;
  align-self: center;
  grid-area: dmr_global;
}

.dmr_typology {
  grid-area: dmr_typology;
}

.comments {
  grid-area: comments;
}

.rating_net {
  justify-self: center;
  align-self: center;
  grid-area: rating_net;
}
</style>