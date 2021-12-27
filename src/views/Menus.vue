<template>
  <div class="my-4">
    <Breadcrumbs :menu="menu" />
  </div>
</template>
<script>
import globalMenu from '@/utils/globalMenu'
import Breadcrumbs from '@/components/Breadcrumbs'
export default {
  name: 'Menus',
  mixins: [globalMenu],
  components: { Breadcrumbs },
  data: () => ({
    menu: [],
  }),
  mounted() {
    const title = this.$route.name || 'Menus'
    const list_menu = this.list_menu
    const findMenu = list_menu.find((el) => el.title == title)

    this.menu = [Object.assign(findMenu, { active: false })]
  },
}
</script>
