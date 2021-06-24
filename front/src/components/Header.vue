.<template>
  <header>
    <Tags />
    <SearchBar />
  </header>
</template>

<script>
import SearchBar from './SearchBar.vue'
import Tags from './Tags.vue'
export default {
  name: 'Header',
  components: { 
    Tags,
    SearchBar
  },
}
</script>

<style>

header {
  box-sizing: border-box;
  display: flex;
  align-items: center;
}

</style>