<template>
  <b-steps animated rounded class="form-steps" v-model="currentStep">
    <b-step-item step="1" label="Identification">
      <risk-identification-step
        :identification="risk.identification"
        :processes="processes"
        :entities="entities"
      />
    </b-step-item>
    <b-step-item step="2" label="Évaluation Inhérente">
      <risk-evaluation-inherent-step
        :evaluation="risk.evaluationInherent"
        @comment-on="storeComment"
      />
    </b-step-item>
    <b-step-item step="3" label="Évaluation Résiduel">
      <risk-evaluation-residuel-step
        :evaluation="risk.evaluationResiduel"
        :dmr-global.sync="risk.evaluationDispositif.dmrGlobal"
      />
    </b-step-item>
    <b-step-item step="4" label="Dispositif des Risques DMR">
      <risk-evaluation-dispositif-step
        :evaluation="risk.evaluationDispositif"
        :rating-raw="risk.evaluationInherent.ratingRaw"
      />
    </b-step-item>

    <template #navigation="{ previous, next }">
      <div class="actions">
        <b-button
          icon-left="chevron-left"
          :disabled="previous.disabled"
          @click.prevent="previousAction(previous)"
          class="prev-btn is-danger"
          outlined
        >
          Précedent
        </b-button>
        <b-button
          :icon-right="next.disabled ? 'content-save-outline' : 'chevron-right'"
          @click.prevent="nextAction(next)"
          class="next-btn is-success"
          outlined
          type="button"
        >
          {{ next.disabled ? "Confirmer" : "Suivant" }}
        </b-button>
      </div>
    </template>
  </b-steps>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import { store } from "@/store/index";
import RiskModule from "@/store/riskModule";
import RiskFormVM, { CauseVM, ImpactedEntityVM } from "@/types/RiskFormVM";
import UiModule from "~/store/uiModule";
import ProcessVM from "~/types/ProcessVM";

@Component
export default class RiskForm extends Vue {
  riskModule!: RiskModule;
  risk: RiskFormVM = {
    identification: {
      riskName: "",
      riskCause: "",
      process: 1,
      description: "",
      impactsOthers: false,
      impactedEntities: [],
      causes: [{ cause: "" }],
    },
    evaluationInherent: {
      frequency: 1,
      impactRaw: 1,
      ratingRaw: 1,
      canProfit: false,
      impactRegulatory: false,
      impactLegal: false,
      impactImageRisk: false,
      impactInsatisfaction: false,
      impactCreditRisk: false,
      impactMarketRisk: false,
      impactProcessInterrupted: false,
      impactOther: false,
      comments: {
        canProfit: "",
        impactRegulatory: "",
        impactLegal: "",
        impactImageRisk: "",
        impactInsatisfaction: "",
        impactCreditRisk: "",
        impactMarketRisk: "",
        impactProcessInterrupted: "",
        impactOther: "",
      },
    },
    evaluationResiduel: {
      controlLevelEfficency: 0,
      controlLevelsDescription: "",
      controlAutoEfficency: 0,
      controlAutoDescription: "",
      procedureCircularEfficency: 0,
      procedureCircularDescription: "",
      sensibilisationFormationEfficency: 0,
      sensibilisationFormationDescription: "",
    },
    evaluationDispositif: {
      dmrGlobal: 0,
      dmrTypology: 0,
      ratingNet: 1,
      comment: "",
    },
  };
  processes: ProcessVM[] = [];
  entities: ImpactedEntityVM[] = [];
  currentStep: number = 0;

  efficencyValues: string[] = [
    EEfficency.NotApplicable,
    EEfficency.Inexistant,
    EEfficency.Inefficient,
    EEfficency.Insuffisant,
    EEfficency.Average,
    EEfficency.Efficient,
  ];
  frequencyValues: string[] = [
    EFrequency.ExtremelyRare,
    EFrequency.Rare,
    EFrequency.Infrequent,
    EFrequency.Frequent,
    EFrequency.VeryFrequent,
    EFrequency.Permanent,
  ];
  impactValues: string[] = [
    EImpactRating.Insignificant,
    EImpactRating.Low,
    EImpactRating.Average,
    EImpactRating.High,
    EImpactRating.VeryHigh,
    EImpactRating.Severe,
  ];
  ratingValues: string[] = [
    ERiskRating.Low,
    ERiskRating.Average,
    ERiskRating.Strong,
    ERiskRating.Critical,
    ERiskRating.Inacceptable,
  ];
  dmrTypologyValues: string[] = [
    EDmrTypology.Preventive,
    EDmrTypology.Curative,
  ];
  async beforeCreate() {
    this.uiModule = getModule(UiModule, store);
    this.riskModule = getModule(RiskModule, store);

    let response = await this.$apollo.query({
      query: getProcesses,
    });

    this.processes = response.data.process;

    response = await this.$apollo.query({
      query: getEntities,
    });

    this.entities = response.data.entity;
  }

  async nextAction(next: any) {
    this.storeRisk();
    next.action();
  }

  previousAction(previous: any) {
    this.storeRisk();
    previous.action();
  }

  storeRisk() {
    this.riskModule.StoreRisk(this.risk);
  }

  storeComment(payload: { impact: string; comment: string }) {
    this.riskModule.CommentOn(payload);
    this.risk.evaluationInherent.comments =
      this.riskModule.currentRisk!!.evaluationInherent.comments;
  }
}
</script>
<style>
ul.step-items {
  list-style: none;
}
.form-steps {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 80px 1fr 80px;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas:
    "steps"
    "step-content"
    "step-actions";
}

.step-content {
  grid-area: step-content;
}

.actions {
  grid-area: step-actions;
  align-self: center;
}

.steps {
  grid-area: steps;
}
</style>