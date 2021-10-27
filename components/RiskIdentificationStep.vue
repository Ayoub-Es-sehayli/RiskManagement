<template>
  <div class="form">
    <b-field
      label="Risque de"
      class="risk-name"
      :type="touched.riskName ? FieldTypeClass('riskName') : ''"
      :message="touched.riskName ? FieldMessage('riskName') : ''"
    >
      <b-input
        v-model="identification.riskName"
        @blur="touched.riskName = true"
        maxlength="50"
      />
    </b-field>
    <b-field
      label="Suite à"
      class="risk-cause"
      :type="touched.riskCause ? FieldTypeClass('riskCause') : ''"
      :message="touched.riskCause ? FieldMessage('riskCause') : ''"
    >
      <b-input
        v-model="identification.riskCause"
        @blur="touched.riskCause = true"
        maxlength="50"
      />
    </b-field>
    <b-field
      label="Processus"
      class="process"
      :type="touched.process ? FieldTypeClass('process') : ''"
      :message="touched.process ? FieldMessage('process') : ''"
    >
      <b-select
        v-model="identification.process"
        expanded
        @blur="touched.process = true"
      >
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
      <b-field
        class="entities"
        v-if="identification.impactsOthers"
        :type="
          touched.impactedEntities ? FieldTypeClass('impactedEntities') : ''
        "
        :message="
          touched.impactedEntities ? FieldMessage('impactedEntities') : ''
        "
      >
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
          @blur="touched.impactedEntities = true"
        />
      </b-field>
    </div>
    <b-field class="causes" label="Causes">
      <b-field
        grouped
        v-for="(cause, index) in identification.causes"
        :key="index"
        :type="touched.causes[index] ? FieldTypeClass(`causes[${index}]`) : ''"
        :message="touched.causes[index] ? FieldMessage(`causes[${index}]`) : ''"
      >
        <b-input
          expanded
          v-model="cause.cause"
          maxlength="100"
          @blur="touched.causes[index] = true"
        />
        <b-button
          :icon-left="causeIcon(index)"
          @click="causeAction(index)"
        ></b-button>
      </b-field>
    </b-field>
    <b-field
      label="Description"
      class="description"
      :type="touched.description ? FieldTypeClass('description') : ''"
      :message="touched.description ? FieldMessage('description') : ''"
    >
      <b-input
        v-model="identification.description"
        type="textarea"
        @blur="touched.description = true"
        maxlength="200"
      />
    </b-field>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ProcessVM from "~/types/ProcessVM";
import { IdentificationVM, ImpactedEntityVM } from "~/types/RiskFormVM";
import { IdentificationSchema } from "~/types/validators/RiskValidator";

@Component
export default class RiskIdentificationStep extends Vue {
  @Prop({ required: true })
  identification!: IdentificationVM;

  @Prop({ required: true })
  processes!: ProcessVM[];

  @Prop({ required: true })
  entities!: ImpactedEntityVM[];

  filteredEntities: ImpactedEntityVM[] = [];
  touched = {
    riskName: false,
    riskCause: false,
    process: false,
    description: false,
    impactsOthers: false,
    impactedEntities: false,
    causes: [false],
  };
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
    this.touched.causes.push(false);
  }
  removeCause(index: number) {
    this.identification.causes.splice(index, 1);
    this.touched.causes.splice(index, 1);
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
  IsValidAt(field: string) {
    return IdentificationSchema.validateSyncAt(field, this.identification);
  }
  FieldTypeClass(field: string) {
    try {
      this.IsValidAt(field);
      return "";
    } catch (error: any) {
      return "is-danger";
    }
  }

  FieldMessage(field: string) {
    try {
      this.IsValidAt(field);
      return "";
    } catch (error: any) {
      return error.errors.join("\n");
    }
  }
}
</script>
<style scoped>
.form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(5, 85px) 1fr;
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