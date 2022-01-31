<template>
  <v-app>
    <notifications position="top right" class="mt-2" />
    <v-main>
      <v-offline
        @detected-condition="amIOnline"
        online-class="online"
        offline-class="offline"
      >
        <router-view v-if="online" />
        <DetectOffline v-else />
      </v-offline>
    </v-main>
  </v-app>
</template>
<script>
import DetectOffline from '@/components/DetectOffline'
export default {
  name: 'App',
  components: { DetectOffline },
  data: () => ({
    online: true,
  }),
  mounted() {
    this.check()
  },
  methods: {
    check() {
      const checking = this.$browserDetect
      const widthScreen = this.$vuetify.breakpoint.width
      if (
        widthScreen >= 600 &&
        !checking.isOpera &&
        !checking.isEdge &&
        !checking.isIE &&
        !checking.isFirefox
      ) {
        return
      } else {
        this.$router.push('/browsersupport')
      }
    },
    amIOnline(e) {
      this.online = e
    },
  },
}
</script>
<style scoped>
.bg-icon-title {
  background: #f0f0f0;
}
</style>
