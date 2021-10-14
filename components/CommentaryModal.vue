<template>
  <form action="" class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">Donner votre commentaire</p>
      <!-- <button type="button" class="delete" @click="$emit('close')" /> -->
    </header>
    <section class="modal-card-body">
      <b-field>
        <b-input
          v-model="newComment"
          placeholder="Commentaire"
          maxlength="200"
          type="textarea"
        ></b-input>
      </b-field>
    </section>
    <footer class="modal-card-foot modal-actions">
      <b-button
        icon-left="cancel"
        label="Annuler"
        class="cancel-btn"
        @click="$emit('close')"
      />
      <b-button
        icon-left="content-save"
        label="Sauvegarder"
        class="save-btn"
        @click="storeComment()"
      />
    </footer>
  </form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class CommentaryModal extends Vue {
  @Prop()
  @Prop()
  comment!: string;

  @Prop()
  impact!: string;

  newComment: string = "";

  mounted() {
    this.newComment = this.comment;
  }
  storeComment() {
    const payload: { impact: string; comment: string } = {
      impact: this.impact,
      comment: this.newComment,
    };
    this.$emit("comment-on", payload);
    this.newComment = "";
    this.$emit("close");
  }
}
</script>