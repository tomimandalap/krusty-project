<template>
  <div class="LayoutDefault">
    <!-- sideleft -->
    <v-navigation-drawer :value="show" color="#fff" class="ps-4 pe-4 py-10" app>
      <div class="ps-4 mb-6 d-flex align-center justify-start">
        <v-avatar color="#F0F0F0" dark size="32" class="me-2">
          <v-icon color="#ff0000" dark>mdi-store</v-icon>
        </v-avatar>
        <strong style="font-size: 20px">
          Krusty
          <span style="color: #ff0000">POS</span>
        </strong>
      </div>

      <!-- menu -->
      <v-list dense nav>
        <v-list-item
          v-for="item in list_menu"
          :key="item.name"
          :to="item.link"
          color="#FF0000"
          link
        >
          <v-list-item-icon>
            <v-icon color="#000" dark>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="black--text">
              {{ item.name }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-spacer></v-spacer>

      <template v-slot:append>
        <div class="text-center">
          <!-- avatar -->
          <v-avatar size="60" class="mb-3">
            <v-img
              :src="require('@/assets/images/profile.jpg')"
              alt="profile.jpg"
            />
          </v-avatar>
          <br />
          <strong>Salsabila</strong>
          <br />
          <small style="color: #8e8e8e">Cashier - 1h50m</small>
          <v-btn
            :loading="loading"
            block
            dark
            elevation="0"
            color="#FF0000"
            class="rounded-lg text-capitalize mb-8 mt-5"
            @click="handleLogout"
          >
            <v-icon dark small>mdi-arrow-left</v-icon>
            Logout
          </v-btn>

          <small style="color: #8e8e8e">© 2021 - krusty pos</small>
        </div>
      </template>
    </v-navigation-drawer>

    <main class="LayoutDefault__main">
      <slot />
    </main>
  </div>
</template>
<script>
import globalMenu from '@/utils/globalMenu'
export default {
  name: 'default',
  mixins: [globalMenu],
  data() {
    return {}
  },
  computed: {
    show() {
      return this.$store.state.show
    },
    loading() {
      return this.$store.state['users'].loading
    },
    show_alert() {
      return this.$store.state['users'].show_alert
    },
    status() {
      return this.$store.state['users'].status
    },
    alert_title() {
      return this.$store.state['users'].alert_title
    },
    alert_message() {
      return this.$store.state['users'].alert_message
    },
  },
  watch: {
    show_alert(val) {
      if (val) {
        this.$notify({
          type: this.status,
          title: this.alert_title,
          text: this.alert_message,
        })
      }
      this.$store.commit('users/setShow', false)
    },
  },
  methods: {
    async handleLogout() {
      this.$store.commit('users/setLoading', true)
      const res = await this.$store.dispatch('users/logout')
      if (res) this.$router.push('/login')
    },
  },
}
</script>
