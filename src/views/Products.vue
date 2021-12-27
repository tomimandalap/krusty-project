<template>
  <LayoutDefault>
    <v-container fluid class="my-4">
      <Breadcrumbs :menu="menu" />
      {{ datas }}
    </v-container>
  </LayoutDefault>
</template>
<script>
import globalMenu from '@/utils/globalMenu'
import Breadcrumbs from '@/components/Breadcrumbs'
import LayoutDefault from '@/layouts/default'
export default {
  name: 'Products',
  mixins: [globalMenu],
  components: {
    Breadcrumbs,
    LayoutDefault,
  },
  data() {
    return {
      menu: [],
    }
  },
  computed: {
    datas() {
      return this.$store.state.products.datas
    },
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      const title = this.$route.name || 'Products'
      const list_menu = this.list_menu
      const findMenu = list_menu.find((el) => el.title == title)

      this.menu = [Object.assign(findMenu, { active: false })]
      this.$store.dispatch('products/getProducts')
    },
  },
}
</script>
