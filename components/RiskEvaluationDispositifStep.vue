<template>
  <div class="form">
    <div class="dmr_global">
      <b-field label="Efficacité Globale DMR">
        <b-button expanded size="is-large" :type="dmrType">{{
          dmrText
        }}</b-button>
      </b-field>
    </div>
    <div class="rating_net">
      <b-field label="Cotations du Risque Net">
        <b-button expanded size="is-large" :type="ratingType">{{
          ratingText
        }}</b-button>
      </b-field>
    </div>
    <div class="dmr_typology">
      <b-field label="Définir la Typologie DMR">
        <b-select>
          <option :value="0">DMR à dominance préventive</option>
          <option :value="1">DMR à dominance curative</option>
        </b-select>
      </b-field>
    </div>
    <div class="comments">
      <b-field label="Commentaire">
        <b-input type="textarea" maxlength="200" expanded />
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

    if (this.evaluation.dmr_global > 2) {
      modifier = this.evaluation.dmr_global - 2;
    }

    return Math.max(0, this.ratingRaw - modifier);
  }

  get dmrText() {
    return this.dmrLabels[Math.max(0, this.evaluation.dmr_global - 1)];
  }

  get dmrType() {
    return this.dmrStyles[Math.max(0, this.evaluation.dmr_global - 1)];
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
    "dmr_typology dmr_global"
    "comments rating_net";
}

.dmr_global {
  justify-self: center;
  align-self: center;
  grid-area: dmr_global;
}

.dmr_typology {
  align-self: center;
  grid-area: dmr_typology;
}

.comments {
  align-self: center;
  grid-area: comments;
}

.rating_net {
  justify-self: center;
  align-self: center;
  grid-area: rating_net;
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