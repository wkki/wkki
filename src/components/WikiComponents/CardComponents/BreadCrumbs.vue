<template>

  <nav class="breadcrumb" aria-label="breadcrumbs">
    <ul>
      <li>
        <a @click="showList(card.idList)">{{ listName(card.idList) }}</a>
      </li>
      <li class="is-active"><a href="#">{{ card.name }}</a></li>
    </ul>
  </nav>

</template>
<script>
  export default {
    props: ['card'],
    methods: {
      listName(listId){
        if (this.$store.getters['lists/lists'][listId]) {
          let name = this.$store.getters['lists/lists'][listId]['list']['name'];
          return name
        } else {
          return 'loading'
        }
      },
      showList(listId){
        this.$store.dispatch('lists/setCurrent', listId);
        this.$store.dispatch('setShowList', true)
      }
    }
  }
</script>
