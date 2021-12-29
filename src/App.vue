<template>
  <v-app>
    <!-- <v-app-bar app color="#fff" dark>
      <v-btn icon color="#F0F0F0" @click="sideleft = !sideleft"
        ><v-icon color="#000" dark>mdi-menu</v-icon></v-btn
      >
    </v-app-bar> -->
    <notifications position="top right" />
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
      if (
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
