<template>
  <div class="form">
    <div class="control_levels">
      <div class="controlLevelEfficency">
        <b-field label="Contrôle de 1er et 2nd nivaux existants">
          <b-select v-model="evaluation.controlLevelEfficency">
            <option :value="0">Non Applicable</option>
            <option :value="5">Efficace</option>
            <option :value="4">Moyen</option>
            <option :value="3">Insuffisant</option>
            <option :value="2">Inefficace</option>
            <option :value="1">Inexistant</option>
          </b-select>
        </b-field>
      </div>
      <div class="controlLevelsDescription">
        <b-field label="Description" label-position="on-border">
          <b-input
            v-model="evaluation.controlLevelsDescription"
            maxlength="200"
            type="textarea"
          ></b-input>
        </b-field>
      </div>
    </div>
    <div class="control_auto">
      <div class="controlAutoEfficency">
        <b-field label="Contrôles automatiques existants">
          <b-select v-model="evaluation.controlAutoEfficency">
            <option :value="0">Non Applicable</option>
            <option :value="5">Efficace</option>
            <option :value="4">Moyen</option>
            <option :value="3">Insuffisant</option>
            <option :value="2">Inefficace</option>
            <option :value="1">Inexistant</option>
          </b-select>
        </b-field>
      </div>
      <div class="controlAutoDescription">
        <b-field label="Description" label-position="on-border">
          <b-input
            v-model="evaluation.controlAutoDescription"
            maxlength="200"
            type="textarea"
          ></b-input>
        </b-field>
      </div>
    </div>
    <div class="procedure_circular">
      <div class="procedureCircularEfficency">
        <b-field label="Procédures & circulaires">
          <b-select v-model="evaluation.procedureCircularEfficency">
            <option :value="0">Non Applicable</option>
            <option :value="5">Efficace</option>
            <option :value="4">Moyen</option>
            <option :value="3">Insuffisant</option>
            <option :value="2">Inefficace</option>
            <option :value="1">Inexistant</option>
          </b-select>
        </b-field>
      </div>
      <div class="procedureCircularDescription">
        <b-field label="Description" label-position="on-border">
          <b-input
            v-model="evaluation.procedureCircularDescription"
            maxlength="200"
            type="textarea"
          ></b-input>
        </b-field>
      </div>
    </div>
    <div class="sensibilisation_formation">
      <div class="sensibilisationFormationEfficency">
        <b-field label="Sensibilisation et formation">
          <b-select v-model="evaluation.sensibilisationFormationEfficency">
            <option :value="0">Non Applicable</option>
            <option :value="5">Efficace</option>
            <option :value="4">Moyen</option>
            <option :value="3">Insuffisant</option>
            <option :value="2">Inefficace</option>
            <option :value="1">Inexistant</option>
          </b-select>
        </b-field>
      </div>
      <div class="sensibilisationFormationDescription">
        <b-field label="Description" label-position="on-border">
          <b-input
            v-model="evaluation.sensibilisationFormationDescription"
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
      this.evaluation.controlLevelEfficency +
      this.evaluation.controlAutoEfficency +
      this.evaluation.procedureCircularEfficency +
      this.evaluation.sensibilisationFormationEfficency;

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
  grid-template-areas: "controlLevelEfficency controlLevelsDescription";
  grid-area: control_levels;
}

.controlLevelEfficency {
  align-self: center;
  grid-area: controlLevelEfficency;
}

.controlLevelsDescription {
  align-self: center;
  justify-self: stretch;
  grid-area: controlLevelsDescription;
}

.control_auto {
  display: grid;
  grid-template-columns: 0.7fr 1.3fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas: "controlAutoEfficency controlAutoDescription";
  grid-area: control_auto;
}

.controlAutoEfficency {
  justify-self: stretch;
  align-self: center;
  grid-area: controlAutoEfficency;
}

.controlAutoDescription {
  align-self: center;
  grid-area: controlAutoDescription;
}

.procedure_circular {
  display: grid;
  grid-template-columns: 0.7fr 1.3fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas: "procedureCircularEfficency procedureCircularDescription";
  grid-area: procedure_circular;
}

.procedureCircularEfficency {
  align-self: center;
  grid-area: procedureCircularEfficency;
}

.procedureCircularDescription {
  align-self: center;
  grid-area: procedureCircularDescription;
}

.sensibilisation_formation {
  display: grid;
  grid-template-columns: 0.7fr 1.3fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas: "sensibilisationFormationEfficency sensibilisationFormationDescription";
  grid-area: sensibilisation_formation;
}

.sensibilisationFormationEfficency {
  align-self: center;
  grid-area: sensibilisationFormationEfficency;
}

.sensibilisationFormationDescription {
  align-self: center;
  grid-area: sensibilisationFormationDescription;
}

.dmrGlobal {
  justify-self: center;
  align-self: center;
  grid-area: dmrGlobal;
}

.dmrTypology {
  grid-area: dmrTypology;
}

.comments {
  grid-area: comments;
}

.ratingNet {
  justify-self: center;
  align-self: center;
  grid-area: ratingNet;
}
</style>