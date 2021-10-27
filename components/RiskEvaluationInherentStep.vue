<template>
  <div class="form">
    <b-field
      class="frequency"
      label="Fréquence"
      :type="touched.frequency ? FieldTypeClass('frequency') : ''"
      :message="touched.frequency ? FieldMessage('frequency') : ''"
    >
      <b-select
        v-model="evaluation.frequency"
        placeholder="A quelle fréquence le risque peut-il se produire?"
      >
        <option :value="0">Moins d’une fois tous les 5 ans</option>
        <option :value="1">Moins d’une fois par an</option>
        <option :value="2">
          Quelques fois par an (entre 1 et 15 fois par an)
        </option>
        <option :value="3">
          Quelques fois par mois (entre 16 et 50 fois par an)
        </option>
        <option :value="4">
          Quelques fois par semaine (entre 51 et 350 fois par an)
        </option>
        <option :value="5">
          Quelques fois par jour (au moins 350 fois par an)
        </option>
      </b-select>
    </b-field>
    <b-field
      class="impactRaw"
      label="Impact Brut"
      :type="touched.impactRaw ? FieldTypeClass('impactRaw') : ''"
      :message="touched.impactRaw ? FieldMessage('impactRaw') : ''"
    >
      <b-select
        v-model="evaluation.impactRaw"
        placeholder="Quel niveau d'impact ce risque peut-il avoir?"
      >
        <option :value="0">Non significatif</option>
        <option :value="1">Faible</option>
        <option :value="2">Moyen</option>
        <option :value="3">Elevé</option>
        <option :value="4">Très élevé</option>
        <option :value="5">Sévère</option>
      </b-select>
    </b-field>
    <b-field
      class="ratingRaw"
      label="Cotations du risque brut"
      :type="touched.ratingRaw ? FieldTypeClass('ratingRaw') : ''"
      :message="touched.ratingRaw ? FieldMessage('ratingRaw') : ''"
    >
      <b-button expanded :type="ratingType" size="is-medium">{{
        ratingText
      }}</b-button>
    </b-field>
    <h4 class="impact_title">Impacts</h4>
    <div class="impacts">
      <b-field class="canProfit" grouped label="Manque à gagner">
        <b-select v-model="evaluation.canProfit">
          <option :value="true">Oui</option>
          <option :value="false">Non</option>
        </b-select>
        <b-button
          class="control"
          icon-right="comment-text-multiple-outline"
          @click="commentOnImpact('canProfit')"
        >
          Commenter
        </b-button>
      </b-field>
      <b-field
        class="impactRegulatory"
        grouped
        label="Réglementaire (ex : Pénalités, retraits, d’agréments)"
        ><b-select v-model="evaluation.impactRegulatory">
          <option :value="true">Oui</option>
          <option :value="false">Non</option>
        </b-select>
        <b-button
          class="control"
          icon-right="comment-text-multiple-outline"
          @click="commentOnImpact('impactRegulatory')"
        >
          Commenter
        </b-button>
      </b-field>
      <b-field class="impactLegal" grouped label="Juridique/Humain & Social"
        ><b-select v-model="evaluation.impactLegal">
          <option :value="true">Oui</option>
          <option :value="false">Non</option>
        </b-select>
        <b-button
          class="control"
          icon-right="comment-text-multiple-outline"
          @click="commentOnImpact('impactLegal')"
        >
          Commenter
        </b-button>
      </b-field>
      <b-field
        class="impactImageRisk"
        grouped
        label="Risque d’image (ex : Impact médiatique)"
        ><b-select v-model="evaluation.impactImageRisk">
          <option :value="true">Oui</option>
          <option :value="false">Non</option>
        </b-select>
        <b-button
          class="control"
          icon-right="comment-text-multiple-outline"
          @click="commentOnImpact('impactImageRisk')"
        >
          Commenter
        </b-button>
      </b-field>
      <b-field
        class="impactInsatisfaction"
        grouped
        label="Insatisfaction (ex : Dégradation service client)"
        ><b-select v-model="evaluation.impactInsatisfaction">
          <option :value="true">Oui</option>
          <option :value="false">Non</option>
        </b-select>
        <b-button
          class="control"
          icon-right="comment-text-multiple-outline"
          @click="commentOnImpact('impactInsatisfaction')"
        >
          Commenter
        </b-button>
      </b-field>
      <b-field
        class="impactCreditRisk"
        grouped
        label="Impact risque de crédit (ex : Probabilité défaut et risque de défaut)"
        ><b-select v-model="evaluation.impactCreditRisk">
          <option :value="true">Oui</option>
          <option :value="false">Non</option>
        </b-select>
        <b-button
          class="control"
          icon-right="comment-text-multiple-outline"
          @click="commentOnImpact('impactCreditRisk')"
        >
          Commenter
        </b-button>
      </b-field>
      <b-field
        class="impactMarketRisk"
        grouped
        label="Impact risque de marché (ex : Augmentation de la volatilité et exposition)"
        ><b-select v-model="evaluation.impactMarketRisk">
          <option :value="true">Oui</option>
          <option :value="false">Non</option>
        </b-select>
        <b-button
          class="control"
          icon-right="comment-text-multiple-outline"
          @click="commentOnImpact('impactMarketRisk')"
        >
          Commenter
        </b-button>
      </b-field>
      <b-field
        class="impactProcessInterrupted"
        grouped
        label="Interruption de processus (ex : Déroulement du processus stoppé)"
        ><b-select v-model="evaluation.impactProcessInterrupted">
          <option :value="true">Oui</option>
          <option :value="false">Non</option>
        </b-select>
        <b-button
          class="control"
          icon-right="comment-text-multiple-outline"
          @click="commentOnImpact('')"
        >
          Commenter
        </b-button>
      </b-field>
      <b-field class="impactOther" grouped label="Autre">
        <b-select v-model="evaluation.impactOther">
          <option :value="true">Oui</option>
          <option :value="false">Non</option>
        </b-select>
        <b-button
          class="control"
          icon-right="comment-text-multiple-outline"
          @click="commentOnImpact('impactOther')"
        >
          Commenter
        </b-button>
      </b-field>
    </div>

    <b-modal
      v-model="modalVisible"
      has-modal-card
      trap-focus
      :destroy-on-hide="true"
      aria-modal
      :can-cancel="false"
      width="300"
    >
      <template #default="props">
        <commentary-modal
          :comment="newComment"
          :impact="selectedImpact"
          @comment-on="storeComment"
          @close="props.close"
        />
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { EvaluationInherentVM, ICommentsVM } from "@/types/RiskFormVM";
import { EvaluationInherentSchema } from "~/types/validators/RiskValidator";

@Component
export default class RiskEvaluationInherentStep extends Vue {
  @Prop({ required: true })
  evaluation!: EvaluationInherentVM;
  modalVisible: boolean = false;
  newComment: string = "";
  ratingMatrix: number[][] = [
    [0, 0, 0, 0, 1, 1],
    [0, 0, 0, 1, 2, 2],
    [0, 0, 1, 2, 3, 3],
    [0, 1, 2, 3, 4, 4],
    [1, 2, 3, 4, 4, 4],
    [2, 3, 4, 4, 4, 4],
  ];

  ratingLabels: string[] = [
    "Faible",
    "Moyen",
    "Fort",
    "Critique",
    "Inacceptable",
  ];
  ratingStyles: string[] = [
    "is-success is-light",
    "is-warning",
    "is-orange",
    "is-danger",
    "is-grey",
  ];
  selectedImpact: string = "";
  touched = {
    frequency: false,
    impactRaw: false,
    ratingRaw: false,
  };
  commentOnImpact(impact: string) {
    this.selectedImpact = impact;
    const comments = this.evaluation.comments as ICommentsVM;
    this.newComment = comments[impact]!!;
    this.modalVisible = true;
  }
  storeComment(payload: { impact: string; comment: string }) {
    this.$emit("comment-on", payload);
  }
  get calculatedRating() {
    this.evaluation.ratingRaw =
      this.ratingMatrix[this.evaluation.impactRaw][this.evaluation.frequency];
    return this.evaluation.ratingRaw;
  }

  get ratingText() {
    return this.ratingLabels[this.calculatedRating];
  }

  get ratingType() {
    return this.ratingStyles[this.calculatedRating];
  }
  IsValidAt(field: string) {
    return EvaluationInherentSchema.validateSyncAt(field, this.evaluation);
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
  grid-template-rows: 40px 1fr 80px 80px 40px;
  gap: 2% 0%;
  grid-auto-flow: row;
  grid-template-areas:
    "impact_title impact_title"
    "impacts impacts"
    "frequency impactRaw"
    "ratingRaw ratingRaw"
    "actions actions";
  justify-items: center;
}

.impact_title {
  grid-area: impact_title;
}

.ratingRaw {
  grid-area: ratingRaw;
}

.frequency {
  grid-area: frequency;
}

.impactRaw {
  grid-area: impactRaw;
}

.impacts {
  justify-self: stretch;
  justify-items: left;
  grid-area: impacts;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr 1fr 1fr 15px;
  gap: 5% 1%;
  grid-auto-flow: row;
  grid-template-areas:
    "canProfit impactRegulatory impactLegal"
    "impactImageRisk impactInsatisfaction impactCreditRisk"
    "impactMarketRisk impactProcessInterrupted impactOther";
}

.canProfit {
  grid-area: canProfit;
}

.impactRegulatory {
  grid-area: impactRegulatory;
}

.impactLegal {
  grid-area: impactLegal;
}

.impactImageRisk {
  grid-area: impactImageRisk;
}

.impactInsatisfaction {
  grid-area: impactInsatisfaction;
}

.impactCreditRisk {
  grid-area: impactCreditRisk;
}

.impactMarketRisk {
  grid-area: impactMarketRisk;
}

.impactProcessInterrupted {
  grid-area: impactProcessInterrupted;
}

.impactOther {
  grid-area: impactOther;
}
.is-orange {
  background-color: rgb(255, 83, 20);
  color: white;
}
.is-grey {
  background-color: rgb(128, 128, 128);
  color: white;
}
</style>