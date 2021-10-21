<template>
  <div class="form">
    <div class="dmrGlobal">
      <b-field label="Efficacité Globale DMR">
        <b-button expanded size="is-large" :type="dmrType">{{
          dmrText
        }}</b-button>
      </b-field>
    </div>
    <div class="ratingNet">
      <b-field label="Cotations du Risque Net">
        <b-button expanded size="is-large" :type="ratingType">{{
          ratingText
        }}</b-button>
      </b-field>
    </div>
    <div class="dmrTypology">
      <b-field label="Définir la Typologie DMR">
        <b-select>
          <option :value="0">DMR à dominance préventive</option>
          <option :value="1">DMR à dominance curative</option>
        </b-select>
      </b-field>
    </div>
    <div class="comments">
      <b-field label="Commentaire">
        <b-input
          type="textarea"
          maxlength="200"
          expanded
          v-model="evaluation.comment"
        />
      </b-field>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { EvaluationDispositifVM } from "~/types/RiskFormVM";

@Component
export default class RiskEvaluationDispositifStep extends Vue {
  @Prop()
  evaluation!: EvaluationDispositifVM;

  @Prop()
  ratingRaw!: number;

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
  dmrLabels: string[] = [
    "Inexistant",
    "Inefficace",
    "Insuffisant",
    "Moyen",
    "Efficace",
  ];
  dmrStyles: string[] = [
    "is-grey",
    "is-danger",
    "is-orange",
    "is-warning",
    "is-success is-light",
  ];

  get calculateRatingNet() {
    let modifier = 0;

    if (this.evaluation.dmrGlobal > 2) {
      modifier = this.evaluation.dmrGlobal - 2;
    }

    return Math.max(0, this.ratingRaw - modifier);
  }

  get dmrText() {
    return this.dmrLabels[Math.max(0, this.evaluation.dmrGlobal - 1)];
  }

  get dmrType() {
    return this.dmrStyles[Math.max(0, this.evaluation.dmrGlobal - 1)];
  }
  get ratingText() {
    return this.ratingLabels[this.calculateRatingNet];
  }

  get ratingType() {
    return this.ratingStyles[this.calculateRatingNet];
  }
}
</script>

<style scoped>
.form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(2, 200px);
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas:
    "dmrTypology dmrGlobal"
    "comments ratingNet";
}

.dmrGlobal {
  justify-self: center;
  align-self: center;
  grid-area: dmrGlobal;
}

.dmrTypology {
  align-self: center;
  grid-area: dmrTypology;
}

.comments {
  align-self: center;
  grid-area: comments;
}

.ratingNet {
  justify-self: center;
  align-self: center;
  grid-area: ratingNet;
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