<template>
  <div class="notifications">
    <transition-group name="list" mode="out-in">
      <Notification 
        v-for="notification in notifications"  
        :key="'noti'+notification.time"
        :notification="notification"
      />
    </transition-group>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Notification from './Notification'

// Notification container (top center)

export default {
  name: 'Notifications',
  components: { Notification },
  computed: {
    ...mapState([ 'notifications' ])
  }
}
</script>

<style scoped>
.notifications {
  font-family: Montserrat;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
}
</style>
