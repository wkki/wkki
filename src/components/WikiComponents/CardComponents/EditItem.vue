<template>
  <div class="field">
    <div class="control">
      <textarea class="textarea" placeholder="" :value="input" @input="update"></textarea>
    </div>
    <button class="button" :disabled="!changes" @click="save()">save</button>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    name: 'editItem',
    data() {
      return {
        changes: false
      }
    },
    computed:{
        input(){
            return this.$store.getters['cards/current']['card']['desc']
        }
    },
    methods: {
      update(e){
        this.changes = true;
        let card =  this.$store.getters['cards/current'];
        card.card.desc = e.target.value;
        this.$store.dispatch('cards/alter', card)
      },
      save(){
        this.$store.dispatch('cards/commit', this.$store.getters['cards/current']);
        this.changes = false;
      }
    }
  }
</script>
