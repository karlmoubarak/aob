<template>
  <div :class="type + 's'">
    <span
      v-for="item in list"
      :key="item.slug"
      :class="type"
      :style="{
        '--top': top()
      }"
      @click="toggle(item.slug)"
    >
      <Checkbox 
        :checked="isInQuery(item.slug)"
      />
      <a>
        <span
          v-html="$highlight(item.Name, queries )"
        ></span>    
      </a>
    </span>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Checkbox from './Checkbox'

export default {
  name: 'SubMenuList',
  components: { Checkbox },
  props: [
    'list',
    'type'
  ],
  computed: {
    ...mapState([ 'query' ]),
    ...mapGetters([ 'queries' ])
  },
  methods: {
    top: () => Math.random() * 50 + '%',
    isInQuery(slug) {
      return (
        this.$route.query[this.type] && 
        this.$route.query[this.type].includes(slug)
      )
    },     
    toggle(slug) {
      const currentSelected = this.$route.query[this.type]
      if (currentSelected) {
        if (!this.isInQuery(slug)) {
          this.$router.push({
            path: '/archive',
            query: { 
              ...this.$route.query,
              ...{ [this.type]: [...currentSelected, ...[slug]] }
            }
          })
        } else {
          this.$router.push({
            path: '/archive',
            query: {
              ...this.$route.query,
              ...{ [this.type]: currentSelected.filter(t => t !== slug) }
            }
          })
        }
      } else { 
        this.$router.push({
          path: '/archive',
          query: {
            ...this.$route.query,
            ...{ [this.type]: [slug] }
          }
        })
      }
    },
  }
}
</script>

<style scoped>
.tags,
.locations {
  box-sizing: border-box;
  /* position: relative; */
  width: 40%;
  height: 100%;
  padding: 0.4em;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  /* justify-content: flex-start; */
  /* align-items: flex-start; */
  /* align-content: flex-start; */
  overflow: scroll; 
  transition: all var(--landing) ease;
}
.tags {
  background-color: var(--lightorange);
  max-height: 12em;
}
.locations {
  background-color: var(--lightestorange);
  max-height: 8em;
}
.tag,
.location {
  margin: 0.5em;
  display: flex;
  align-items: center;
  max-width: 25%;
  transition: all var(--landing) ease;
  cursor: pointer;
}
.landing .tags,
.landing .locations {
  max-height: 100%;
  width: 50%; 
}
.landing .tag,
.landing .location {
  margin-top: var(--top);
}
a,
a:visited,
a:active,
a:hover {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  text-decoration: none;
}


.mobile .tags,
.mobile .locations {
  flex-wrap: nowrap;
  /* flex-basis: 50%; */
}

.mobile.landing .tag,
.mobile.landing .location {
  max-width: 100%;
  margin-top: 0.5em;
}
</style>

