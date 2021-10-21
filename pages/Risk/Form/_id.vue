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
import getProcesses from "/apollo/query/getProcesses.gql";
import getEntities from "/apollo/query/getEntities.gql";
import addRisk from "/apollo/mutation/addRisk.gql";
import {
  EDmrTypology,
  EEfficency,
  EFrequency,
  EImpactRating,
  ERiskRating,
} from "~/types/types";

@Component
export default class RiskForm extends Vue {
  riskModule!: RiskModule;
  uiModule!: UiModule;
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
    try {
      let response = await this.$apollo.query({
        query: getProcesses,
      });

      this.processes = response.data.process;

      response = await this.$apollo.query({
        query: getEntities,
      });

      this.entities = response.data.entity;
    } catch (error: any) {
      this.$buefy.snackbar.open({
        message: "Un erreur lors de connection au serveur",
        type: "is-danger",
      });
      console.log(error.message);
      // this.$router.back();
    }
  }
  mounted() {
    this.uiModule.ChangeTitle(
      "Formulatire d’Identification des Risques Opérationnels"
    );
  }
  async nextAction(next: any) {
    if (next.disabled) {
      this.$buefy.dialog.confirm({
        message: "Êtes-vous sure des informations saisis?",
        title: "Identification Risque",
        onConfirm: () => {
          this.saveRisk()
            .then(() => {
              this.$buefy.snackbar.open({
                message: "Le Risque a était sauveguardé avec succèss",
                type: "is-success",
              });
            })
            .catch((reason) => {
              console.log(reason);
              this.$buefy.snackbar.open({
                message:
                  "Une erreur s'est produite lors de la sauvegarde du risque",
                type: "is-danger",
              });
            });
        },
      });
    } else {
      this.storeRisk();
      next.action();
    }
  }
  async saveRisk() {
    let input: any = {
      identification: {
        riskName: this.risk.identification.riskName,
        riskCause: this.risk.identification.riskCause,
        process: this.risk.identification.process,
        description: this.risk.identification.description,
        impactsOthers: this.risk.identification.impactsOthers,
        impactedEntities: this.risk.identification.impactedEntities,
        causes: this.risk.identification.causes.map(
          (value: CauseVM) => value.cause
        ),
      },
      evaluationInherent: {
        frequency: this.frequencyValues[this.risk.evaluationInherent.frequency],
        impactRaw: this.impactValues[this.risk.evaluationInherent.impactRaw],
        ratingRaw: this.ratingValues[this.risk.evaluationInherent.ratingRaw],
        canProfit: this.risk.evaluationInherent.canProfit,
        impactRegulatory: this.risk.evaluationInherent.impactRegulatory,
        impactLegal: this.risk.evaluationInherent.impactLegal,
        impactImageRisk: this.risk.evaluationInherent.impactImageRisk,
        impactInsatisfaction: this.risk.evaluationInherent.impactInsatisfaction,
        impactCreditRisk: this.risk.evaluationInherent.impactCreditRisk,
        impactMarketRisk: this.risk.evaluationInherent.impactMarketRisk,
        impactProcessInterrupted:
          this.risk.evaluationInherent.impactProcessInterrupted,
        impactOther: this.risk.evaluationInherent.impactOther,
        comments: {
          canProfit: this.risk.evaluationInherent.comments.canProfit,
          impactRegulatory:
            this.risk.evaluationInherent.comments.impactRegulatory,
          impactLegal: this.risk.evaluationInherent.comments.impactLegal,
          impactImageRisk:
            this.risk.evaluationInherent.comments.impactImageRisk,
          impactInsatisfaction:
            this.risk.evaluationInherent.comments.impactInsatisfaction,
          impactCreditRisk:
            this.risk.evaluationInherent.comments.impactCreditRisk,
          impactMarketRisk:
            this.risk.evaluationInherent.comments.impactMarketRisk,
          impactProcessInterrupted:
            this.risk.evaluationInherent.comments.impactProcessInterrupted,
          impactOther: this.risk.evaluationInherent.comments.impactOther,
        },
      },
      evaluationResiduel: {
        controlLevelEfficency:
          this.efficencyValues[
            this.risk.evaluationResiduel.controlLevelEfficency
          ],
        controlLevelsDescription:
          this.risk.evaluationResiduel.controlLevelsDescription,
        controlAutoEfficency:
          this.efficencyValues[
            this.risk.evaluationResiduel.controlAutoEfficency
          ],
        controlAutoDescription:
          this.risk.evaluationResiduel.controlAutoDescription,
        procedureCircularEfficency:
          this.efficencyValues[
            this.risk.evaluationResiduel.procedureCircularEfficency
          ],
        procedureCircularDescription:
          this.risk.evaluationResiduel.procedureCircularDescription,
        sensibilisationFormationEfficency:
          this.efficencyValues[
            this.risk.evaluationResiduel.sensibilisationFormationEfficency
          ],
        sensibilisationFormationDescription:
          this.risk.evaluationResiduel.sensibilisationFormationDescription,
      },
      evaluationDispositif: {
        dmrGlobal:
          this.efficencyValues[this.risk.evaluationDispositif.dmrGlobal],
        dmrTypology:
          this.dmrTypologyValues[this.risk.evaluationDispositif.dmrTypology],
        ratingNet: this.ratingValues[this.risk.evaluationDispositif.ratingNet],
        comment: this.risk.evaluationDispositif.comment,
      },
    };
    const response = await this.$apollo.mutate({
      mutation: addRisk,
      variables: {
        risk: input,
      },
    });
    console.log(response);
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