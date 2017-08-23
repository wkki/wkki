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
            return this.$store.getters.activeCard.desc
        }
    },
    methods: {
      update(e){
        console.log(e.target.value);
        this.changes = true;
        this.$store.dispatch('setActiveCardsDesc', e.target.value)
      },
      save(){
        this.$store.dispatch('saveCard', this.$store.getters.activeCard);
        this.changes = false;
      }
    }
  }
</script>
