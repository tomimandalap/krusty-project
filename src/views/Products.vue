<template>
  <LayoutDefault>
    <Loading :showLoading="loading" />
    <v-container v-if="!loading" fluid class="py-4 ps-10 pe-10">
      <v-row>
        <v-col lg="8">
          <Breadcrumbs :menu="menu" />
        </v-col>

        <v-col lg="4">
          <v-form @submit.prevent="handleSearch" class="pa-2">
            <v-text-field
              v-model="params.q"
              dense
              outlined
              color="#000"
              clearable
              prepend-inner-icon="mdi-magnify"
              placeholder="Search food or drinks"
              class="rounded-lg"
            >
              <template #append-outer>
                <v-btn
                  elevation="0"
                  color="#ffe600"
                  height="32"
                  class="text-capitalize rounded-lg"
                  @click="$router.push('/products/add')"
                >
                  Add
                </v-btn>
              </template>
            </v-text-field>
          </v-form>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          v-show="datas.length"
          v-for="(items, i) in datas"
          :key="i"
          lg="3"
        >
          <v-card
            elevetion="0"
            class="rounded-lg cursor"
            @click="$router.push(`/products/detail/${items.id}`)"
          >
            <v-img
              height="250"
              :src="items.image ? `${ImgProduct}/${items.image}` : null"
            >
              <div class="pt-4 ps-3 pl-3 pb-0 custom_card_product">
                <h3 class="white--text">
                  {{
                    items.name.length > 18
                      ? `${items.name.substr(0, 18)}...`
                      : items.name
                  }}
                </h3>

                <p class="c_primary font-weight-bold">
                  {{ formatCurrency(items.price) }}
                </p>
              </div>
            </v-img>
          </v-card>
        </v-col>

        <v-col v-show="!datas.length" cols="12">
          <div class="content-center text-center">
            <v-img
              :src="require('@/assets/images/dasboard.png')"
              alt="dasboard.png"
              max-width="500"
              class="d-block mx-auto"
            ></v-img>
            <h2 class="my-5">Search Food or drinks</h2>
            <h1>
              Not
              <span style="color: #ff0000">Found!</span>
            </h1>
          </div>
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
      params: {
        q: '',
        sort_by: '',
        page: 1,
        limit: 25,
      },
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
    const title = this.$route.name || 'Products'
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

    this.load()
  },
  methods: {
    load() {
      this.$store.commit('products/setLoading', true)

      setTimeout(() => {
        this.$store.dispatch('products/getProducts', this.params)
      }, 2000)
    },
    handleSearch() {
      this.$store.commit('products/setLoading', true)
      setTimeout(() => {
        this.$store.dispatch('products/getProducts', this.params)
      }, 500)
    },
  },
}
</script>
