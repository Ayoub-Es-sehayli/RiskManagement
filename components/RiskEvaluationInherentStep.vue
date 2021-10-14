<template>
  <div class="form">
    <b-field class="frequency" label="Fréquence">
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
    <b-field class="impact_raw" label="Impact Brut">
      <b-select
        v-model="evaluation.impact_raw"
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
    <b-field class="rating_raw" label="Cotations du risque brut">
      <b-button expanded :type="ratingType" size="is-medium">{{
        ratingText
      }}</b-button>
    </b-field>
    <h4 class="impact_title">Impacts</h4>
    <div class="impacts">
      <b-field class="can_profit" grouped label="Manque à gagner">
        <b-select v-model="evaluation.can_profit">
          <option :value="true">Oui</option>
          <option :value="false">Non</option>
        </b-select>
        <b-button
          class="control"
          icon-right="comment-text-multiple-outline"
          @click="commentOnImpact('can_profit')"
        >
          Commenter
        </b-button>
      </b-field>
      <b-field
        class="impact_regulatory"
        grouped
        label="Réglementaire (ex : Pénalités, retraits, d’agréments)"
        ><b-select v-model="evaluation.impact_regulatory">
          <option :value="true">Oui</option>
          <option :value="false">Non</option>
        </b-select>
        <b-button
          class="control"
          icon-right="comment-text-multiple-outline"
          @click="commentOnImpact('impact_regulatory')"
        >
          Commenter
        </b-button>
      </b-field>
      <b-field class="impact_legal" grouped label="Juridique/Humain & Social"
        ><b-select v-model="evaluation.impact_legal">
          <option :value="true">Oui</option>
          <option :value="false">Non</option>
        </b-select>
        <b-button
          class="control"
          icon-right="comment-text-multiple-outline"
          @click="commentOnImpact('impact_legal')"
        >
          Commenter
        </b-button>
      </b-field>
      <b-field
        class="impact_image_risk"
        grouped
        label="Risque d’image (ex : Impact médiatique)"
        ><b-select v-model="evaluation.impact_image_risk">
          <option :value="true">Oui</option>
          <option :value="false">Non</option>
        </b-select>
        <b-button
          class="control"
          icon-right="comment-text-multiple-outline"
          @click="commentOnImpact('impact_image_risk')"
        >
          Commenter
        </b-button>
      </b-field>
      <b-field
        class="impact_insatisfaction"
        grouped
        label="Insatisfaction (ex : Dégradation service client)"
        ><b-select v-model="evaluation.impact_insatisfaction">
          <option :value="true">Oui</option>
          <option :value="false">Non</option>
        </b-select>
        <b-button
          class="control"
          icon-right="comment-text-multiple-outline"
          @click="commentOnImpact('impact_insatisfaction')"
        >
          Commenter
        </b-button>
      </b-field>
      <b-field
        class="impact_credit_risk"
        grouped
        label="Impact risque de crédit (ex : Probabilité défaut et risque de défaut)"
        ><b-select v-model="evaluation.impact_credit_risk">
          <option :value="true">Oui</option>
          <option :value="false">Non</option>
        </b-select>
        <b-button
          class="control"
          icon-right="comment-text-multiple-outline"
          @click="commentOnImpact('impact_credit_risk')"
        >
          Commenter
        </b-button>
      </b-field>
      <b-field
        class="impact_market_risk"
        grouped
        label="Impact risque de marché (ex : Augmentation de la volatilité et exposition)"
        ><b-select v-model="evaluation.impact_market_risk">
          <option :value="true">Oui</option>
          <option :value="false">Non</option>
        </b-select>
        <b-button
          class="control"
          icon-right="comment-text-multiple-outline"
          @click="commentOnImpact('impact_market_risk')"
        >
          Commenter
        </b-button>
      </b-field>
      <b-field
        class="impact_process_interrupted"
        grouped
        label="Interruption de processus (ex : Déroulement du processus stoppé)"
        ><b-select v-model="evaluation.impact_process_interrupted">
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
      <b-field class="impact_other" grouped label="Autre"
        ><b-select v-model="evaluation.impact_other">
          <option :value="true">Oui</option>
          <option :value="false">Non</option>
        </b-select>
        <b-button
          class="control"
          icon-right="comment-text-multiple-outline"
          @click="commentOnImpact('impact_other')"
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
import { EvaluationInherentVM } from "@/types/RiskFormVM";

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

  commentOnImpact(impact: string) {
    this.selectedImpact = impact;
    this.newComment = this.evaluation.comments[impact];
    this.modalVisible = true;
  }
  storeComment(payload: { impact: string; comment: string }) {
    this.$emit("comment-on", payload);
  }
  get calculatedRating() {
    this.evaluation.rating_raw =
      this.ratingMatrix[this.evaluation.impact_raw][this.evaluation.frequency];
    return this.evaluation.rating_raw;
  }

  get ratingText() {
    return this.ratingLabels[this.calculatedRating];
  }

  get ratingType() {
    return this.ratingStyles[this.calculatedRating];
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
    "frequency impact_raw"
    "rating_raw rating_raw"
    "actions actions";
  justify-items: center;
}

.impact_title {
  grid-area: impact_title;
}

.rating_raw {
  grid-area: rating_raw;
}

.frequency {
  grid-area: frequency;
}

.impact_raw {
  grid-area: impact_raw;
}

.impacts {
  justify-self: stretch;
  justify-items: left;
  grid-area: impacts;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr 1fr 1fr 1fr;
  gap: 5% 1%;
  grid-auto-flow: row;
  grid-template-areas:
    "can_profit impact_regulatory impact_legal"
    "impact_image_risk impact_insatisfaction impact_credit_risk"
    "impact_market_risk impact_process_interrupted impact_other";
}

.can_profit {
  grid-area: can_profit;
}

.impact_regulatory {
  grid-area: impact_regulatory;
}

.impact_legal {
  grid-area: impact_legal;
}

.impact_image_risk {
  grid-area: impact_image_risk;
}

.impact_insatisfaction {
  grid-area: impact_insatisfaction;
}

.impact_credit_risk {
  grid-area: impact_credit_risk;
}

.impact_market_risk {
  grid-area: impact_market_risk;
}

.impact_process_interrupted {
  grid-area: impact_process_interrupted;
}

.impact_other {
  grid-area: impact_other;
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