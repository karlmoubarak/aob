<template>
  <div class="tags">
    <span
      v-for="item in tags"
      :key="item.slug"
      class="tag"
      :style="{
        '--top': top()
      }"
    >
      <Checkbox 
        :checked="isInQuery(item.slug)"
      />

      <a @click="toggleTag(item.slug)">
        <span
          v-html="$highlight(item.Name, queries )"
        ></span>    
      </a>
      <!-- <span v-if="!isLast(item, tags)">, </span> -->
      
      
    </span>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Checkbox from './Checkbox'

export default {
  name: 'Tags',
  components: { Checkbox },
  props: [
  ],
  data() {
    return {
    }
  },
  computed: {
    ...mapState([
      'tags',
      'query',
      'selectedTags'
    ]),
    ...mapGetters(['queries'])
  },
  methods: {
    isLast: (item, array) => (
      array.indexOf(item) === array.length - 1
    ),
    top: () => Math.random() * 50 + '%',
    
    toggleTag(slug) {
      const currentTags = this.$route.query.tag
      if (currentTags) {
        if (!this.isInQuery(slug)) {
          this.$router.push({
            path: '/archive',
            query: { 
              ...this.$route.query,
              ...{ tag: [...currentTags, ...[slug]] }
            }
          })
        } else {
          this.$router.push({
            path: '/archive',
            query: {
              ...this.$route.query,
              ...{ tag: currentTags.filter(t => t !== slug) }
            }
          })
        }
      } else { 
        this.$router.push({
          path: '/archive',
          query: {
            ...this.$route.query,
            ...{ tag: [slug] }
          }
        })
      }
    },
    isInQuery(tag) {
      return this.$route.query.tag && this.$route.query.tag.includes(tag)
    }     
  }
}
</script>

<style scoped>
.tags {
  box-sizing: border-box;
  /* margin: 1em; */
  font-size: inherit;
  background-color: var(--lightorange);
  background-size: 40% auto;
  width: 40%;
  height: 100%;
  max-height: 12em;
  padding: 0.4em;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  /* justify-content: center; */
  /* align-items: center; */
  /* align-content: flex-start; */
  overflow: scroll;
  transition: all var(--landing) ease;
  /* box-shadow: 0 0em 5em 0em #ffffffa4; */
  
}
.tag {
  margin: 0.5em 2em;
  display: flex;
  align-items: center;
  /* margin-top: 0; */
  max-width: 20%;
  transition: all var(--landing) ease;
  cursor: pointer;
}
.landing .tags {
  max-height: 100%;
  width: 50%;
  
}
.landing .tag {
  margin-top: var(--top);
}
a,
a:visited,
a:active,
a:hover {
  text-decoration: none;
}
</style>

