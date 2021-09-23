.<template>
  <nav>
    <SubMenuList
      :list="locations"
      :type="'location'"
    />
    <SubMenuList
      :list="tags"
      :type="'tag'"
    />
  </nav>
</template>

<script>
import { mapState } from 'vuex'
import SubMenuList  from './SubMenuList'

export default {
  name: 'Nav',
  components: { 
    SubMenuList,
  },
  computed: {
    ...mapState([
      'tags',
      'locations'
    ])
  }
}
</script>

<style scoped>
nav {
  position: relative;
  box-sizing: border-box;
  /* height: 100%; */
  flex-shrink: 0;
  max-height: 40em;
  min-height: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  transition: all var(--landing) ease;
  z-index: 2;
  background: var(--lightblue)
  
}

.landing nav {
  margin-top: -2em;
  max-height: calc(100% - 0em);
  min-height: calc(100% - 0em);
}

.mobile.landing nav {
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  /* height: 100%; */
  max-height: unset;
  margin-top: unset;
}
.mobile nav {
  overflow: hidden;
  max-height: 0;
}


</style>