<template>
  <div>
    <ul>
      <li>trixi {{ version }}</li>
      <li>board id {{ $store.getters.boardId }}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        version: process.env.VERSION
      }
    },
  }
</script>
