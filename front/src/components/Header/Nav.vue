.<template>
  <nav>
    <SearchBar />
    <SubMenuList
      :list="tags"
      :type="'tag'"
    />
    <SubMenuList
      :list="locations"
      :type="'location'"
    />
  </nav>
</template>

<script>
import { mapState } from 'vuex'
import SearchBar    from './SearchBar'
import SubMenuList  from './SubMenuList'

export default {
  name: 'Nav',
  components: { 
    SearchBar,
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
  height: 100%;
  max-height: 10em;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  transition: all var(--landing) ease;
  z-index: 2;
}

.landing nav {
  max-height: 100vh;
}

.mobile.landing nav {
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  height: 100%;
  max-height: unset;
}
.mobile nav {
  overflow: hidden;
  max-height: 0;
}


</style>