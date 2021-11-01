<template>
  <div class="container">
    <b-menu accordion class="side-menu">
      <!-- <b-menu-list label="Recherche">
        <b-input placeholder="Nom de processus" />
      </b-menu-list> -->
      <b-menu-list label="Filiales">
        <b-menu-item label="Holding Al Omrane" expanded>
          <b-menu-item
            v-for="domain in domains"
            :key="domain.id"
            @click="selectDomain(domain.id)"
          >
            <template #label="props">
              <b-icon
                :icon="props.expanded ? 'minus-box' : 'plus-box'"
              ></b-icon>
              {{ domain.name }}
            </template>
            <b-menu-item
              v-for="macroProcess in domain.macroProcesses"
              :key="macroProcess.id"
              @click="selectMacroProcess(macroProcess.id)"
            >
              <template #label="props">
                <b-icon
                  :icon="props.expanded ? 'minus-box' : 'plus-box'"
                ></b-icon>
                {{ macroProcess.name }}
              </template>
              <b-menu-item
                v-for="process in macroProcess.processes"
                :key="process.id"
                @click="selectProcess(process.id)"
              >
                <template #label="props">
                  {{ process.name }}
                  <b-icon
                    :icon="props.active ? 'checkbox-marked-outline' : ''"
                  ></b-icon>
                </template>
              </b-menu-item>
            </b-menu-item>
          </b-menu-item>
        </b-menu-item>
      </b-menu-list>
      <b-menu-list label="Actions"></b-menu-list>
    </b-menu>
    <b-table
      class="tree-view"
      striped
      height="850px"
      sticky-header
      :total="filteredActivities.length"
      :debounce-search="1000"
      :data="FilteredActivities"
    >
      <b-table-column field="name" label="Activité" searchable>
        <template #searchable="{ column, filters }">
          <b-input v-model="filters[column.field]" icon="magnify" expanded />
        </template>
        <template v-slot="props">
          {{ props.row.name }}
        </template>
      </b-table-column>
      <b-table-column label="Actions" width="70">
        <b-button type="is-info" icon-left="information-outline"></b-button
      ></b-table-column>
      <template #empty>
        <div class="has-text-centered">Il n'y a aucun activité à afficher</div>
      </template>
    </b-table>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import { store } from "@/store/index";
import UiModule from "@/store/uiModule";
import {
  ActivityListVM,
  DomainListVM,
  MacroProcessesListVM,
  ProcessListVM,
} from "@/types/DomainVM";

@Component
export default class ProcessMap extends Vue {
  uiModule!: UiModule;
  domains: DomainListVM[] = [];
  filteredActivities: ActivityListVM[] = [];
  selectedDomain: number = -1;
  selectedMacroProcess: number = -1;
  selectedProcess: number = -1;
  async beforeCreate() {
    this.uiModule = getModule(UiModule, store);
  }
  mounted() {
    this.uiModule.ChangeTitle("Cartographie des Processus");
  }
  filterActivities(
    domainFilter: (value: DomainListVM) => boolean,
    macroProcessFilter: (value: MacroProcessesListVM) => boolean,
    processFilter: (value: ProcessListVM) => boolean
  ) {
    this.filteredActivities = this.domains
      .filter(domainFilter)
      .flatMap((domain) =>
        domain.macroProcesses
          .filter(macroProcessFilter)
          .flatMap((macroProcess) =>
            macroProcess.processes
              .filter(processFilter)
              .flatMap((process) => process.activities)
          )
      );
  }
  selectDomain(id: number) {
    if (this.selectedDomain == id) {
      this.selectedDomain = -1;
    } else {
      this.selectedDomain = id;
    }
    this.selectedMacroProcess = -1;
    this.selectedProcess = -1;
  }
  selectMacroProcess(id: number) {
    if (this.selectedMacroProcess == id) {
      this.selectedMacroProcess = -1;
      this.selectedProcess = -1;
    } else {
      this.selectedMacroProcess = id;
    }
    this.selectedProcess = -1;
  }
  selectProcess(id: number) {
    if (this.selectedProcess == id) {
      this.selectedProcess = -1;
    } else {
      this.selectedProcess = id;
    }
  }
  get FilteredActivities() {
    let domainFilter = (_: DomainListVM) => true;
    let macroProcessFilter = (_: MacroProcessesListVM) => true;
    let processFilter = (_: ProcessListVM) => true;
    if (this.selectedDomain != -1) {
      domainFilter = (value: DomainListVM) => value.id == this.selectedDomain;
    }
    if (this.selectedMacroProcess != -1) {
      macroProcessFilter = (value: MacroProcessesListVM) =>
        value.id == this.selectedMacroProcess;
    }
    if (this.selectedProcess != -1) {
      processFilter = (value: ProcessListVM) =>
        value.id == this.selectedProcess;
    }
    this.filterActivities(domainFilter, macroProcessFilter, processFilter);
    return this.filteredActivities;
  }
}
</script>
<style scoped>
ul > * {
  list-style: none;
}
.container {
  width: 100vw;
  display: grid;
  grid-template-columns: 400px 1fr;
  grid-template-rows: 1fr;
  gap: 0px 1%;
  grid-template-areas: "side-menu tree-view";
}

.side-menu {
  grid-area: side-menu;
}

.tree-view {
  grid-area: tree-view;
}
</style>