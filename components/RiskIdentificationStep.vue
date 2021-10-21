<template>
  <div class="form">
    <b-field label="Risque de" class="risk-name">
      <b-input v-model="identification.riskName" />
    </b-field>
    <b-field label="Suite à" class="risk-cause">
      <b-input v-model="identification.riskCause" />
    </b-field>
    <b-field label="Processus" class="process">
      <b-select v-model="identification.process" expanded>
        <option
          v-for="process in processes"
          :key="process.id"
          :value="process.id"
        >
          {{ process.name }}
        </option>
      </b-select>
    </b-field>
    <b-field label="Marco-Processus" class="macro-process">
      <b-input disabled v-model="MacroProcess" />
    </b-field>
    <b-field label="Domaine" class="domain">
      <b-input disabled v-model="Domain" />
    </b-field>
    <div class="impacts-others">
      <b-field class="impact_switch">
        <b-switch v-model="identification.impactsOthers">
          Impacts sur d'autre entité
        </b-switch>
      </b-field>
      <b-field class="entities" v-if="identification.impactsOthers">
        <b-taginput
          :data="filteredEntities"
          v-model="identification.impactedEntities"
          :open-on-focus="true"
          :autocomplete="true"
          :allow-new="false"
          :allow-duplicates="false"
          field="name"
          icon="label"
          @typing="getFilteredEntities"
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
import ProcessVM from "~/types/ProcessVM";
import { IdentificationVM, ImpactedEntityVM } from "~/types/RiskFormVM";

@Component
export default class RiskIdentificationStep extends Vue {
  @Prop({ required: true })
  identification!: IdentificationVM;

  @Prop({ required: true })
  processes!: ProcessVM[];

  @Prop({ required: true })
  entities!: ImpactedEntityVM[];

  filteredEntities: ImpactedEntityVM[] = [];

  mounted() {
    this.filteredEntities = this.entities;
  }
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

  getFilteredEntities(text: string) {
    this.filteredEntities = this.entities.filter((option) => {
      return (
        option.name.toString().toLowerCase().indexOf(text.toLowerCase()) >= 0
      );
    });
  }

  get MacroProcess() {
    return this.processes.find((p) => p.id == this.identification.process)
      ?.macroProcess.name;
  }
  get Domain() {
    return this.processes.find((p) => p.id == this.identification.process)
      ?.macroProcess.domain.name;
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