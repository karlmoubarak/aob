.<template>
  <nav>
    <Tags />
    <Locations />
    <SearchBar />
  </nav>
</template>

<script>
import Locations from './Locations'
import SearchBar from './SearchBar'
import Tags from './Tags'

export default {
  name: 'Nav',
  components: { 
    Tags,
    SearchBar,
    Locations,
  },
}
</script>

<style>

nav {
  position: relative;
  box-sizing: border-box;
  height: 100%;
  max-height: 10em;
  display: flex;
  align-items: flex-start;
  justify-content: stretch;
  transition: all var(--landing) ease;
  z-index: 1;
}
.landing nav {
  /* flex-basis: 100%; */
  max-height: 100vh;
}

/* header.landing .navItem,  */
.landing nav .tag, 
.landing nav .location {
  /* position: absolute; */
  /* top: 0; */
  /* left: 0; */
}

</style>