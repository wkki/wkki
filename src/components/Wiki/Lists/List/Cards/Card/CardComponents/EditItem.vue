<template>
  <div>

    <!--
  todo: add modal to say okay, actually archive file
-->
    <div class="field has-addons has-addons-right">
      <button class="button is-danger" @click="showArchiveModal=!showArchiveModal">archive card</button>
    </div>
    <div :class="showArchiveModal ? 'modal is-active' : 'modal'">
      <div class="modal-background"></div>
      <div class="modal-card">
        <section class="modal-card-body">
          <h5 class="title is-5">sure?</h5>
          you can always restore this card via trello
        </section>
        <footer class="modal-card-foot">

          <button class="button is-danger" @click=archiveCard()>
            <span class="icon is-small">
              <i class="fa fa-check" aria-hidden="true"></i>
            </span>
            archive card
          </button>

          <button class="button" @click="showArchiveModal=!showArchiveModal">
            <i class="fa fa-close" aria-hidden="true"></i>
          </button>
          
        </footer>
      </div>
      <button class="modal-close is-large" aria-label="close"></button>
    </div>

    <div class="field">
      <div class="control">
        <textarea class="textarea" ref="textarea" placeholder="" @input="update" :value="card.desc"></textarea>
      </div>
    </div>

    <div class="field">
      <button class="button" :disabled="!changes" @click="save()">save</button>
      <button class="button" :disabled="!changes" @click="resetDesc()">reset</button>
    </div>

  </div>

</template>

<script>
  import Vue from 'vue'
  import autosize from 'autosize'

  export default {
    name: 'editItem',
    props: ['card'],
    data() {
      return {
        changes: false,
        unchangedDesc: this.card.desc,
        showArchiveModal: false
      }
    },
    computed: {},
    methods: {
      update(e) {
        autosize(this.$refs.textarea);
        this.changes = true;
        this.card.desc = e.target.value;
      },
      save() {
        this.$store.dispatch('cards/commit', this.card);
        this.unchangedDesc = this.card.desc;
        this.changes = false;
      },
      resetDesc() {
        this.card.desc = this.unchangedDesc;
        this.changes = false;
      },
      archiveCard() {
        console.log("deleting card", this.card)
        this.$store.dispatch('cards/archiveCard', this.card);
        this.$router.push({ name: 'board', params: { boardId: this.card.idBoard } })
      }
    },
    mounted() {
      autosize(this.$refs.textarea);
    }
  }
</script>