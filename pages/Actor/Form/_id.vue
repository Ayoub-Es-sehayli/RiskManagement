<template>
  <div class="form">
    <b-field label="Activité" class="activity"
      ><b-input v-model="activity.activity"
    /></b-field>
    <b-field label="Processus" class="process">
      <b-select expanded v-model="activity.process">
        <option
          v-for="process in processes"
          :key="process.id"
          :value="process.id"
        >
          {{ process.name }}
        </option>
      </b-select>
    </b-field>
    <b-field label="Acteur Risque" class="actor">
      <b-select expanded v-model="activity.actor">
        <option v-for="actor in actors" :key="actor.id" :value="actor.id">
          {{ actor.name }}
        </option>
      </b-select>
    </b-field>
    <b-field label="Marco-Processus" class="macro-process">
      <b-input disabled v-model="MacroProcess" />
    </b-field>
    <b-field label="Domaine" class="domain">
      <b-input disabled v-model="Domain" />
    </b-field>
    <div class="actions">
      <b-button type="is-success" outlined @click="saveAndClear"
        >Ajouter & Continuer</b-button
      >
      <b-button type="is-success" outlined @click="saveAndExit"
        >Ajouter</b-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import { store } from "@/store/index";
import UiModule from "@/store/uiModule";
import ProcessVM from "@/types/ProcessVM";
import getProcesses from "/apollo/query/getProcesses.gql";
import addActivity from "/apollo/mutation/addActivity.gql";
import ActivityVM from "@/types/ActivityVM";
import ActorVM from "@/types/ActorVM";

@Component
export default class ActorForm extends Vue {
  uiModule!: UiModule;

  processes: ProcessVM[] = [];
  actors: ActorVM[] = [];
  activity: ActivityVM = {
    process: -1,
    activity: "",
    actor: -1,
  };
  async beforeCreate() {
    this.uiModule = getModule(UiModule, store);
    this.uiModule.ChangeTitle("Formulaire d'Identification Acteur Risques");

    try {
      let response = await this.$apollo.query({
        query: getProcesses,
      });

      this.processes = response.data.process;
    } catch (error: any) {
      this.processes = [
        {
          id: 1,
          name: "dd",
          macroProcess: {
            name: "dd",
            domain: { name: "dd" },
          },
        },
      ];
      this.actors = [
        {
          id: 1,
          name: "Directeur X",
        },
      ];
      this.$buefy.snackbar.open({
        message: "Un erreur lors de connection au serveur",
        type: "is-danger",
      });
      console.log(error.message);
      // this.$router.back();
    }
  }
  clearForm() {
    this.activity = {
      process: -1,
      activity: "",
      actor: -1,
    };
  }
  async save() {
    try {
      const response = await this.$apollo.mutate({
        mutation: addActivity,
        variables: {
          activity: this.activity
        }
      });
      this.$buefy.snackbar.open({
        message: "L'Activité a était sauveguardé avec succès",
        type: "is-success",
      });
    } catch (error: any) {
      this.$buefy.snackbar.open({
        message: "Un erreur lors du sauveguarde de l'activité",
        type: "is-danger",
      });
      console.log(error.message);
    }
  }
  async saveAndClear() {
    await this.save();
    this.clearForm();
  }
  async saveAndExit() {
    await this.save();
    this.$router.push("/");
  }
  get MacroProcess() {
    return this.processes.find((p) => p.id == this.activity.process)
      ?.macroProcess.name;
  }
  get Domain() {
    return this.processes.find((p) => p.id == this.activity.process)
      ?.macroProcess.domain.name;
  }
}
</script>

<style scoped>
.form {
  padding: 3%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(4, 100px) 80px;
  gap: 0px 3%;
  grid-auto-flow: row;
  grid-template-areas:
    "activity activity"
    "process actor"
    "macroProcess domain"
    "description description"
    "actions actions";
}

.description {
  grid-area: description;
}

.macroProcess {
  grid-area: macroProcess;
}

.domain {
  grid-area: domain;
}

.process {
  grid-area: process;
}

.actor {
  grid-area: actor;
}

.activity {
  grid-area: activity;
}

.actions {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  gap: 0px 3%;
  grid-area: actions;
}

</style>