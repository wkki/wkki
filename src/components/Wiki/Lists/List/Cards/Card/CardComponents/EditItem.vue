<template>
  <div>
    <div class="field">
      <div class="control">
        <textarea class="textarea" ref="textarea" placeholder="" @input="update" :value="card.desc"></textarea>
      </div>
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
        unchangedDesc: this.card.desc
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
      }
    },
    mounted() {
      autosize(this.$refs.textarea);
    }
  }
</script>
