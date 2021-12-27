<template>
  <div class="my-4">
    <Breadcrumbs :menu="menu" />
  </div>
</template>
<script>
import globalMenu from '@/utils/globalMenu'
import Breadcrumbs from '@/components/Breadcrumbs'
export default {
  name: 'Products',
  mixins: [globalMenu],
  components: {
    Breadcrumbs,
  },
  data() {
    return {
      menu: [],
    }
  },
  mounted() {
    const title = this.$route.name || 'Products'
    const list_menu = this.list_menu
    const findMenu = list_menu.find((el) => el.title == title)

    this.menu = [Object.assign(findMenu, { active: false })]
  },
}
</script>
