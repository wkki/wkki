<template>
  <div>
    <ul>
      <li>wkki {{ version }}</li>
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
