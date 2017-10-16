<template>
  <div class="columns is-multiline">
    <div class="column">

      <div class="media-content">
        <div class="content">

          <div v-html="convert(card.desc)"></div>

        </div>
      </div>
    </div>

    <div class="column" v-if="card.attachments.length > 0">

      <div class="tile is-ancestor">
        <div class="tile is-parent is-vertical">

          <article class="tile is-child box" v-for="attachment in card.attachments">
            <p>{{ attachment['name'] }}</p>
            <figure v-if="attachment['previews'].length > 0" class="image is-4by3">

              <a :href="attachment['url']"><img style="object-fit: contain;"
                                                :src="attachment['previews'][2]['url']"></a>
            </figure>

            <a v-else="" :href="attachment['url']">download</a>
          </article>

        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import showdown from 'showdown'
  const conv = new showdown.Converter({});

  export default {
    props: ['card'],
    methods: {
      convert(markdownText) {
        return conv.makeHtml(markdownText) || '[no text]';
      }
    }
  }
</script>
