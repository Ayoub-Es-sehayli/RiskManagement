<template>
  <b-steps animated rounded class="form-steps" v-model="currentStep">
    <b-step-item step="1" label="Identification">
      <risk-identification-step :identification="risk.identification" />
    </b-step-item>
    <b-step-item step="2" label="Évaluation Inhérente">
      <risk-evaluation-inherent-step
        :evaluation="risk.evaluation_inherent"
        @comment-on="storeComment"
      />
    </b-step-item>
    <b-step-item step="3" label="Évaluation Résiduel">
      <risk-evaluation-residuel-step
        :evaluation="risk.evaluation_residuel"
        :dmr-global.sync="risk.evaluation_dispositif.dmr_global"
      />
    </b-step-item>
    <b-step-item step="4" label="Dispositif des Risques DMR">
      <risk-evaluation-dispositif-step
        :evaluation="risk.evaluation_dispositif"
        :rating-raw="risk.evaluation_inherent.rating_raw"
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
          icon-right="chevron-right"
          @click.prevent="nextAction(next)"
          class="next-btn is-success"
          outlined
          :type="next.disabled ? 'submit' : 'button'"
        >
          Suivant
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
import RiskFormVM from "@/types/RiskFormVM";

@Component
export default class RiskForm extends Vue {
  riskModule!: RiskModule;
  risk: RiskFormVM = {
    identification: {
      riskName: "",
      riskCause: "",
      process: 1,
      description: "",
      impacts_others: false,
      impacted_entities: [],
      causes: [{ cause: "" }],
    },
    evaluation_inherent: {
      frequency: 1,
      impact_raw: 1,
      rating_raw: 1,
      can_profit: false,
      impact_regulatory: false,
      impact_legal: false,
      impact_image_risk: false,
      impact_insatisfaction: false,
      impact_credit_risk: false,
      impact_market_risk: false,
      impact_process_interrupted: false,
      impact_other: false,
      comments: {
        can_profit: "",
        impact_regulatory: "",
        impact_legal: "",
        impact_image_risk: "",
        impact_insatisfaction: "",
        impact_credit_risk: "",
        impact_market_risk: "",
        impact_process_interrupted: "",
        impacts_other: "",
      },
    },
    evaluation_residuel: {
      control_levels_efficency: 0,
      control_levels_description: "",
      control_auto_efficency: 0,
      control_auto_description: "",
      procedure_circular_efficency: 0,
      procedure_circular_description: "",
      sensibilisation_formation_efficency: 0,
      sensibilisation_formation_description: "",
    },
    evaluation_dispositif: {
      dmr_global: 0,
      dmr_typology: 0,
      rating_net: 1,
      comment: "",
    },
  };
  currentStep: number = 1;
  async beforeCreate() {
    this.riskModule = getModule(RiskModule, store);
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
    this.risk.evaluation_inherent.comments =
      this.riskModule.currentRisk!!.evaluation_inherent.comments;
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