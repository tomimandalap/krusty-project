<template>
  <LayoutDefault>
    <v-container fluid class="py-4 ps-10 pe-10">
      <Breadcrumbs :menu="menu" />
    </v-container>
  </LayoutDefault>
</template>
<script>
import globalMenu from '@/utils/globalMenu'
import Breadcrumbs from '@/components/Breadcrumbs'
import LayoutDefault from '@/layouts/default'
export default {
  name: 'Menus',
  mixins: [globalMenu],
  components: { Breadcrumbs, LayoutDefault },
  data: () => ({
    menu: [],
  }),
  computed: {
    loading() {
      return this.$store.state['products'].loading
    },
    show_alert() {
      return this.$store.state['products'].show_alert
    },
    status() {
      return this.$store.state['products'].status
    },
    alert_title() {
      return this.$store.state['products'].alert_title
    },
    alert_message() {
      return this.$store.state['products'].alert_message
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
      this.$store.commit('products/setShow', false)
    },
  },
  mounted() {
    const title = this.$route.name || 'Menus'
    const list_menu = this.list_menu
    const findMenu = list_menu.find((el) => el.title == title)

    // assign obj
    const assignData = [Object.assign(findMenu, { active: true })]

    // mapping menu
    this.menu = assignData.map((el) => {
      const { title, active, link } = el
      return {
        text: title,
        disabled: active,
        href: link,
      }
    })
  },
}
</script>
