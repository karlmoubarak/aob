<template>
  <div id="home">

  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState([
      'isMobile',
    ])
  }

}
</script>

<style>

#home {
  box-sizing: border-box;
  position: relative;
  height: 100%;
  width: 100%;
}

</style>