.<template>
  <header>
    <div class="top">
      <router-link to="/">
        Archive of Belonging
      </router-link>
      <Nav />
    </div>
    <div class="bottom">
      <Tags />
      <SearchBar />
    </div>
  </header>
</template>

<script>
import Nav from './Nav.vue'
import SearchBar from './SearchBar.vue'
import Tags from './Tags.vue'
export default {
  name: 'Header',
  components: { 
    Tags,
    SearchBar,
    Nav
  },
}
</script>

<style>

header {
  box-sizing: border-box;
}

.top {
  display: flex;
  width: 100%;
}
.bottom {
  display: flex;
}

</style>