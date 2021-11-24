<template>
  <div :class="[ 'notification', { positive } ]">
    <div>{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: 'Notification',
  props: [ 'notification' ],
  computed: {
    message()  { return this.notification.message },
    positive() { return this.notification.positive }
  }
}
</script>

<style scoped>

.notification {
  max-height: 40em;
  /* margin-bottom: 0.5em; */
  width: 30em;
  transition: all var(--slow) ease;
  display: flex;
  align-items: flex-start;
}
.notification div {
  padding: 0.5em;
  background: var(--lightestorange);
}
.notification.positive div {
  background: var(--lightgreen);
}
.mobile .notification {
  width: 100%;
}
</style>
