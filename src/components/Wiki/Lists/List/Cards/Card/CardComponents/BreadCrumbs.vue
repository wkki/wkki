<template>

  <nav class="breadcrumb" aria-label="breadcrumbs">
    <ul>
      <li>
        <a @click="$router.push({name: 'board', params: {boardId: card.idBoard}})">
          <i class="fa fa-arrow-left" aria-hidden="true"></i>
        </a> {{ listName(card.idList) }}
      </li>
      <li class="is-active"><a href="#">{{ card.name }}</a></li>
    </ul>
  </nav>

</template>
<script>
  export default {
    props: ['card'],
    methods: {
      listName(listId) {
        if (this.$store.getters['lists/lists'][listId]) {
          let name = this.$store.getters['lists/lists'][listId]['name'];
          return name
        } else {
          return 'loading'
        }
      }
    }
  }
</script>
