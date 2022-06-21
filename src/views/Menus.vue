<template>
  <LayoutDefault>
    <Loading :showLoading="loading" />
    <v-container v-if="!loading" fluid class="py-4 ps-10 pe-10">
      <v-row class="no-gutters">
        <v-col lg="7">
          <Breadcrumbs :menu="menu" />
        </v-col>
        <v-col lg="5">
          <v-form class="pa-2 d-flex justify-lg-space-around align-center">
            <v-text-field
              v-model="params.q"
              dense
              outlined
              color="black"
              clearable
              prepend-inner-icon="mdi-magnify"
              placeholder="Search food or drinks"
              class="rounded-lg me-2"
              @click:prepend-inner="handleSearch"
            >
              <template #prepend>
                <v-btn
                  :disabled="!list_cart.length"
                  elevation="0"
                  color="#F0F0F0"
                  height="32"
                  small
                  class="text-capitalize rounded-lg"
                  @click.stop="showCart = !showCart"
                >
                  <v-icon small>mdi-cart</v-icon>
                  {{ indexCart }}
                </v-btn>
              </template>
            </v-text-field>

            <v-select
              v-model="params.sort_by"
              dense
              outlined
              :items="items"
              item-value="value"
              item-text="text"
              color="black"
              append-icon="mdi-chevron-down"
              placeholder="Filter by"
              class="rounded-lg"
            ></v-select>
          </v-form>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          v-show="datas.length"
          v-for="(items, i) in datas"
          :key="i"
          lg="3"
          md="4"
          sm="6"
          cols="12"
        >
          <v-card
            elevetion="0"
            class="rounded-lg cursor"
            @click="handleCart(items)"
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

      <!-- cart -->
      <v-navigation-drawer
        v-model="showCart"
        absolute
        right
        temporary
        width="330"
        class="px-3"
      >
        <v-list-item class="py-4">
          <v-list-item-content>
            <v-list-item-title class="text-h6 text-center">
              <v-icon color="black" @click="showCart = false">mdi-cart</v-icon>
              Cart
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <div style="min-height: 400px; overflow-y: auto; overflow-x: hidden">
          <v-row class="no-gutters">
            <v-col
              v-for="(item, i) in list_cart"
              :key="i"
              cols="12"
              class="my-1"
            >
              <v-card elevation="0" outlined class="">
                <div class="d-flex justify-space-between align-center">
                  <v-avatar class="ma-3 rounded-lg" size="50" tile>
                    <v-img :src="`${ImgProduct}/${item.image}`"></v-img>
                  </v-avatar>

                  <div class="text-left float-start">
                    <small class="text-truncate">
                      {{
                        item.name.length > 15
                          ? `${item.name.substr(0, 15)}...`
                          : item.name
                      }}
                    </small>

                    <div class="d-flex justify-center align-center">
                      <v-btn
                        elevation="0"
                        x-small
                        color="#ffe600"
                        @click="handleMinCart(item.id)"
                      >
                        <v-icon small color="black">mdi-minus</v-icon>
                      </v-btn>
                      <span class="text-truncate mx-2">
                        {{ item.quality }}
                      </span>
                      <v-btn
                        elevation="0"
                        x-small
                        color="#ffe600"
                        @click="handlePlusCart(item.id)"
                      >
                        <v-icon small color="black">mdi-plus</v-icon>
                      </v-btn>
                    </div>
                  </div>
                  <div>
                    <v-card-text class="font-weight-bold">
                      {{ formatCurrency(item.sub_total) }}
                    </v-card-text>
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </div>

        <template v-slot:append>
          <div
            class="d-flex justify-space-between align-center rounded-lg pa-3 bg_gray mb-5"
          >
            <span>
              PPN
              <strong class="red--text">*</strong>
            </span>
            <strong>{{ formatCurrency(ppn) }}</strong>
          </div>

          <div
            class="d-flex justify-space-between align-center rounded-lg pa-3 bg_gray mb-5"
          >
            <span>Total</span>
            <strong>{{ formatCurrency(totalCart) }}</strong>
          </div>

          <v-text-field
            v-model="data_order.customer_name"
            outlined
            label="Customer"
            placeholder="Input name customer"
            color="black"
            maxLength="30"
            class="rounded-lg"
            :error-messages="
              $v.data_order.customer_name.$dirty &&
              !$v.data_order.customer_name.required
                ? 'Customer is required'
                : $v.data_order.customer_name.$dirty &&
                  !$v.data_order.customer_name.onlyText
                ? 'Input only alphabet'
                : []
            "
            @blur="$v.data_order.customer_name.$touch()"
          ></v-text-field>

          <v-btn
            :loading="loadingOrder"
            block
            elevation="0"
            color="#ffe600"
            class="rounded-lg text-capitalize"
            @click.stop="handleOrder"
          >
            Order
          </v-btn>

          <v-btn
            block
            dark
            outlined
            elevation="0"
            color="#ff0000"
            class="rounded-lg text-capitalize mt-5 mb-10"
            @click.stop="handleReset"
          >
            Cancel
          </v-btn>
        </template>
      </v-navigation-drawer>
      <!-- end cart -->

      <!-- popup struc -->
      <Struck
        :stateStruck="stateStruck"
        :data_order="data_order"
        :handleClose="
          () => {
            stateStruck = false
            showCart = true
          }
        "
        :handlePayment="handlePayment"
        :loadingPayment="loadingPayment"
      />
      <!-- end popup struc -->

      <!-- modals for info success or failed transaction -->
      <Modals
        :state_modal="state_modal"
        :alert_message="alert_message"
        :stateSuccess="stateSuccess"
        :handleCloseModal="
          () => {
            state_modal = false
          }
        "
      />
      <!-- end modals for info success or failed transaction -->
    </v-container>
  </LayoutDefault>
</template>
<script>
import globalMenu from '@/utils/globalMenu'
import convertion from '@/utils/convertion'
import LayoutDefault from '@/layouts/default'
import Breadcrumbs from '@/components/Breadcrumbs'
import Loading from '@/components/Loading'
import Struck from '@/components/Struck'
import Modals from '@/components/Modals'
import { validationMixin } from 'vuelidate'
import { required, helpers } from 'vuelidate/lib/validators'
const onlyText = helpers.regex('onlyText', /^[a-zA-Z]*$/)
export default {
  name: 'Menus',
  mixins: [globalMenu, convertion, validationMixin],
  components: { Breadcrumbs, LayoutDefault, Loading, Struck, Modals },
  data: () => ({
    showCart: false,
    stateStruck: false,
    state_modal: false,
    stateSuccess: false,
    menu: [],
    items: [
      {
        id: 1,
        text: 'Sort by',
        value: '',
      },
      {
        id: 2,
        text: 'Ascending',
        value: 'asc',
      },
      {
        id: 3,
        text: 'Descending',
        value: 'desc',
      },
    ],
    params: {
      q: '',
      sort_by: '',
      page: 1,
      limit: 25,
    },
    list_cart: [],
    indexCart: 0,
    totalCart: 0,
    ppn: 0,
    loadingOrder: false,
    loadingPayment: false,
    data_order: {
      order_id: null,
      cashier_name: null,
      customer_name: null,
      item_order: [],
      ppn_amount: 0,
      total_amount: 0,
    },
  }),
  validations() {
    return {
      data_order: {
        customer_name: { required, onlyText },
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
    getName() {
      return this.$store.getters['users/getName']
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
    list_cart(val) {
      if (!val.length) this.showCart = false
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
      const { name, active, link } = el
      return {
        text: name,
        disabled: active,
        href: link,
      }
    })

    this.load()
  },
  methods: {
    async load() {
      this.$store.commit('products/setLoading', true)
      await this.$store.dispatch('products/getProducts', this.params)
    },
    handleSearch() {
      this.$store.commit('products/setLoading', true)
      setTimeout(() => {
        this.$store.dispatch('products/getProducts', this.params)
      }, 500)
    },
    handleCart(data) {
      const { id, name, category, image, price } = data

      const filter_product = this.list_cart.filter((el) => {
        return el.id == id
      })

      if (filter_product.length) {
        this.handlePlusCart(id)
      } else {
        const add_new_product = {
          id,
          name,
          category,
          image,
          price,
          quality: 1,
          sub_total: 1 * price,
        }
        this.list_cart = [...this.list_cart, add_new_product]
      }
      this.handleSumming()
    },
    handleMinCart(id) {
      this.list_cart.forEach((element) => {
        if (element.id == id) {
          element.quality -= 1
          element.sub_total = element.quality * element.price
        }

        if (element.quality < 1) {
          const newData = this.list_cart.filter((item) => {
            return item.id !== id
          })
          this.list_cart = newData
        }
      })
      this.handleSumming()
    },
    handlePlusCart(id) {
      this.list_cart.forEach((element) => {
        if (element.id == id) {
          element.quality += 1
          element.sub_total = element.quality * element.price
        }

        if (element.quality > 10) {
          element.quality = 10
          this.$store.commit('products/setShow', true)
          this.$store.commit('products/setStatus', 'info')
          this.$store.commit('products/setTitle', 'Cart')
          this.$store.commit(
            'products/setMessage',
            `Quantity ${element.name} maximum 10`,
          )
        }
      })
      this.handleSumming()
    },
    handleSumming() {
      this.indexCart = this.totalCart = 0
      this.list_cart.forEach((el) => {
        this.indexCart = this.indexCart + el.quality
        this.ppn = (this.totalCart + el.sub_total) * 0.1 // ppn 10%
        this.totalCart = this.totalCart + el.sub_total + this.ppn
      })
    },
    handleReset() {
      this.list_cart = []
      this.indexCart = 0

      this.data_order = {
        order_id: null,
        cashier_name: null,
        customer_name: null,
        item_order: [],
        ppn_amount: 0,
        total_amount: 0,
      }

      this.$v.data_order.$reset()
    },
    handleOrder() {
      this.$v.$touch()

      if (this.$v.$invalid) {
        return false
      }

      this.loadingOrder = true

      const datenow = new Date()
        .toISOString()
        .substring(0, 10)
        .split('-')
        .join('')

      const random_id = new Date()
      const hour = random_id.getUTCHours() + 7 // GMT 7
      const minute = random_id.getUTCMinutes()
      const second = random_id.getUTCSeconds()

      Object.assign(this.data_order, {
        order_id: `${datenow}KRUSTY${hour}${
          minute < 10 ? '0' + minute : minute
        }${second}`,
        cashier_name: this.getName,
        item_order: this.list_cart,
        ppn_amount: this.ppn,
        total_amount: this.totalCart,
      })

      this.stateStruck = true
      this.loadingOrder = this.showCart = false
    },
    async handlePayment() {
      this.state_modal = true
      let joinOrder = this.data_order.item_order.map((element) => {
        return `${element.name} x${element.quality} ${element.sub_total}`
      })

      this.loadingPayment = true

      const res = await this.$store.dispatch('products/addHistory', {
        ...this.data_order,
        item_order: joinOrder.toString(),
      })

      this.stateSuccess = res // state modal after payment

      if (res) {
        this.handleReset()
        this.stateStruck = this.loadingPayment = false
      } else {
        this.showCart = true
        this.stateStruck = this.loadingPayment = false
      }
    },
  },
}
</script>
