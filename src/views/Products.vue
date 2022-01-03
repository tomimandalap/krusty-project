<template>
  <LayoutDefault>
    <Loading :showLoading="loading" />
    <v-container v-if="!loading" fluid class="my-4">
      <Breadcrumbs :menu="menu" />

      <v-row>
        <v-col v-for="(items, i) in datas" :key="i" lg="3">
          <v-card
            elevetion="0"
            class="rounded-lg cursor"
            @click="handleDetail(items.id)"
          >
            <v-img
              height="250"
              :src="items.image ? `${ImgProduct}/${items.image}` : null"
            >
              <div class="pt-4 ps-3 pl-3 pb-0 custom_card_product">
                <h3 class="white--text">{{ items.name }}</h3>
                <p class="c_primary font-weight-bold">
                  {{ formatCurrency(items.price) }}
                </p>
              </div>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </LayoutDefault>
</template>
<script>
import globalMenu from '@/utils/globalMenu'
import convertion from '@/utils/convertion'
import LayoutDefault from '@/layouts/default'
import Breadcrumbs from '@/components/Breadcrumbs'
import Loading from '@/components/Loading'
export default {
  name: 'Products',
  mixins: [globalMenu, convertion],
  components: {
    LayoutDefault,
    Breadcrumbs,
    Loading,
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
    ImgProduct() {
      return this.$store.state.ImgProduct
    },
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
    this.load()
  },
  methods: {
    load() {
      const title = this.$route.name || 'Products'
      const list_menu = this.list_menu
      const findMenu = list_menu.find((el) => el.title == title)

      this.menu = [Object.assign(findMenu, { active: false })]

      this.$store.commit('products/setLoading', true)

      setTimeout(() => {
        this.$store.dispatch('products/getProducts')
      }, 2000)
    },
    handleDetail(id) {
      alert(id)
    },
  },
}
</script>
