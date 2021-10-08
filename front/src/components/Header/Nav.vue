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

// Navigation bar with tags and locations

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
  flex-shrink: 0;
  min-height: 5em;
  max-height: 50em;
  display: flex;
  align-items: flex-start;
  transition: all var(--landing) ease;
}

.landing nav {
  margin-top: -2em;
  min-height: 100%;
  max-height: 100%;
}

.mobile nav {
  overflow: hidden;
  min-height: unset;
  max-height: 0;
}

.mobile.landing nav {
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  max-height: unset;
  margin-top: unset;
}


</style>