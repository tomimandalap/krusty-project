<template>
  <LayoutDefault>
    <v-container fluid class="py-4 ps-10 pe-10">
      <Breadcrumbs :menu="menu" />

      <Formproduct :mode_form="mode_form" />
    </v-container>
  </LayoutDefault>
</template>
<script>
import globalMenu from '@/utils/globalMenu'
import LayoutDefault from '@/layouts/default'
import Breadcrumbs from '@/components/Breadcrumbs'
import Formproduct from '@/components/FormProduct'
export default {
  name: 'addProduct',
  mixins: [globalMenu],
  components: {
    LayoutDefault,
    Breadcrumbs,
    Formproduct,
  },
  data: () => ({
    menu: [],
    mode_form: 'add',
  }),
  mounted() {
    const [title_menu, title_submenu] = this.$route.path.split('/').slice(1)

    // parrent menu
    const parrent_menu = this.list_menu.find(
      (el) => el.title.toLowerCase() === title_menu,
    )

    // child menu
    const sub_menu = this.list_menu.reduce((previousVal, currentVal) => {
      const data = currentVal.child_menu.find(
        (el) => el.title.toLowerCase() === title_submenu,
      )
      if (data) previousVal = data
      return previousVal
    }, {})

    delete parrent_menu.child_menu

    // assign data
    const assignParent = Object.assign(parrent_menu, { active: false })
    const assignSub = Object.assign(sub_menu, { active: true })

    const dataMenu = []

    dataMenu.push(assignParent)
    dataMenu.push(assignSub)

    // mapping menu
    this.menu = dataMenu.map((el) => {
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
