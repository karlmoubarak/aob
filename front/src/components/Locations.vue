<template>
  <div class="locations">
    <span
      v-for="item in locations"
      :key="item.slug"
      class="location"
      :style="{
        '--top': top()
      }"
    >
      <Checkbox 
        :checked="isInQuery(item.slug)"
      />
      <a @click="toggleLocation(item.slug)">
        <span
          v-html="$highlight(item.Name, queries )"
        ></span>
      </a>
      <!-- <span v-if="!isLast(item, tags)">, </span> -->
    </span>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Checkbox from './Checkbox.vue'

export default {
  name: 'Locations',
  prop: [
  ],
  computed: {
    ...mapState([
      'locations',
      'query'
    ]),
    ...mapGetters(['queries'])
    
  },
  components: {
    Checkbox
  },
  methods: {
    isLast: (item, array) => (
      array.indexOf(item) === array.length - 1
    ),
    top: () => Math.random() * 50 + '%',
    toggleLocation(slug) {
      const currentLocations = this.$route.query.location
      if (currentLocations) {
        if (!this.isInQuery(slug)) {
          this.$router.push({
            path: '/archive',
            query: { 
              ...this.$route.query,
              ...{ location: [...currentLocations, ...[slug]] }
            }
          })
        } else {
          this.$router.push({
            path: '/archive',
            query: {
              ...this.$route.query,
              ...{ location: currentLocations.filter(t => t !== slug) }
            }
          })
        }
      } else {
        this.$router.push({
          path: '/archive',
          query: {
            ...this.$route.query,
            ...{ location: [slug] }
          }
        })
      }
    },
    isInQuery(location) {
      return this.$route.query.location && this.$route.query.location.includes(location)
    } 
  },
  created() {
    // console.log(this.locations)
  }
}
</script>

<style scoped>
.locations {
  box-sizing: border-box;
  /* margin: 1em; */
  font-size: inherit;
  background-color: var(--lightestorange);
  background-size: 40% auto;
  width: 40%;
  height: 80%;
  max-height: 8em;
  padding: 0.4em;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  /* justify-content: center;
  align-items: center;
  align-content: flex-start flex-end; */
  transition: all var(--landing) ease;
  
}
.location {
  margin: 0.5em;
  display: flex;
  align-items: center;
  transition: all var(--landing) ease;
  cursor: pointer;
}
.landing .locations {
  height: 100%;
  max-height: 100%;
  width: 50%;
}
.landing .location {
  margin-top: var(--top);
  /* margin: 12% -5%; */
  /* margin: auto; */
}
a,
a:visited,
a:active,
a:hover {
  text-decoration: none;
}
</style>