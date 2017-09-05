<template>

  <div v-if="$store.getters['boards/current'] && $store.getters.showBoardSettings">
    <div class="columns">
      <div class="column">
        <h4 class="title is-4">members</h4>
        <table class="table">
          <thead>
          <tr>
            <th>member</th>
            <th>type</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="member in $store.getters['boards/current']['members']">
            <td>{{member.username}}</td>
            <td>{{member.memberType}}</td>
          </tr>
          </tbody>
        </table>
        {{ $store.getters['boards/current']['board'] }}
      </div>
    </div>
  </div>

</template>

<script>
  import Vue from 'vue'

  export default {
    name: 'settings',
    components: {},
    computed: {},
    methods: {},
    mounted() {
    },
  }
</script>
