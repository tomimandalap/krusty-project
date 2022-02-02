<template>
  <LayoutDefault>
    <Loading :showLoading="loading" />
    <v-container v-if="!loading" fluid class="py-4 ps-10 pe-10">
      <Breadcrumbs :menu="menu" />

      <v-card class="my-5">
        <v-card-title>
          <v-form @submit.prevent="handleSearching" style="width: 100%">
            <v-text-field
              v-model="params.q"
              dense
              outlined
              single-line
              hide-details
              color="black"
              append-icon="mdi-magnify"
              class="rounded-lg"
              placeholder="Searching by order id"
            ></v-text-field>
          </v-form>
        </v-card-title>
        <v-data-table :headers="headers" :items="datas">
          <template #[`header.order_id`]="{ header }">
            <div class="text-truncate">
              {{ header.text }}
            </div>
            <v-chip
              label
              x-small
              color="#00bf71"
              text-color="#fff"
              class="mb-2"
            >
              Customer Name
            </v-chip>
          </template>
          <template #[`item.order_id`]="{ item }">
            <div class="text-truncate">
              {{ item.order_id }}
            </div>
            <v-chip
              label
              x-small
              color="#00bf71"
              text-color="#fff"
              class="mb-2"
            >
              {{ item.customer_name }}
            </v-chip>
          </template>
          <template #[`item.total_amount`]="{ item }">
            <div class="text-truncate">
              {{ formatCurrency(item.total_amount) }}
            </div>
          </template>
          <template #[`item.created_at`]="{ item }">
            <div class="text-truncate">
              {{ item.created_at | formatDateTime }}
            </div>
          </template>
          <template #[`item.actions`]="{ item }">
            <v-btn
              dense
              block
              outlined
              elevation="0"
              color="#00bf71"
              :disabled="getAccess != 1"
              class="text-capitalize rounded-lg"
              @click="handleDetail(item.order_id)"
            >
              <v-icon>mdi-eye</v-icon>
              Detail
            </v-btn>
          </template>
        </v-data-table>
      </v-card>

      <!-- popup struc -->
      <Struck
        mode_struck
        :stateStruck="stateStruck"
        :data_order="detail_history"
        :handleClose="
          () => {
            stateStruck = false
          }
        "
        :handlePayment="
          () => {
            stateStruck = false
          }
        "
      />
      <!-- end popup struc -->
    </v-container>
  </LayoutDefault>
</template>
<script>
import globalMenu from '@/utils/globalMenu'
import Breadcrumbs from '@/components/Breadcrumbs'
import Struck from '@/components/Struck'
import Loading from '@/components/Loading'
import LayoutDefault from '@/layouts/default'
import convertion from '@/utils/convertion'
import moment from 'moment'
export default {
  name: 'History',
  mixins: [globalMenu, convertion],
  components: { Breadcrumbs, LayoutDefault, Struck, Loading },
  filters: {
    formatDateTime(params) {
      return moment(params).format('lll')
    },
  },
  data() {
    return {
      menu: [],
      params: {
        q: '',
        sort_by: 'desc',
        page: 1,
        limit: 25,
      },
      headers: [
        {
          text: 'Order ID',
          align: 'start',
          filterable: false,
          value: 'order_id',
          width: '25%',
        },
        {
          text: 'Cashier',
          align: 'start',
          value: 'cashier_name',
          width: '25%',
        },
        { text: 'Cash', align: 'start', value: 'total_amount', width: '15%' },
        { text: 'Created', align: 'center', value: 'created_at', width: '20%' },
        { text: '', align: 'center', value: 'actions', width: '15%' },
      ],
      stateStruck: false,
      detail_history: {},
    }
  },
  computed: {
    getAccess() {
      return parseInt(this.$store.getters['users/getAccess'])
    },
    datas() {
      return this.$store.state['historys'].datas
    },
    data_order() {
      return this.$store.state['historys'].data_order
    },
    loading() {
      return this.$store.state['historys'].loading
    },
    show_alert() {
      return this.$store.state['historys'].show_alert
    },
    status() {
      return this.$store.state['historys'].status
    },
    alert_title() {
      return this.$store.state['historys'].alert_title
    },
    alert_message() {
      return this.$store.state['historys'].alert_message
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
      this.$store.commit('historys/setShow', false)
    },
  },
  mounted() {
    const title = this.$route.name || 'History'
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
    async load() {
      this.$store.commit('historys/setLoading', true)
      await this.$store.dispatch('historys/allHistory', { ...this.params })
    },
    async handleDetail(order_id) {
      const res = await this.$store.dispatch('historys/detailHistory', order_id)
      if (res) {
        const {
          id,
          order_id,
          cashier_name,
          customer_name,
          ppn_amount,
          total_amount,
          created_at,
          updated_at,
        } = this.data_order

        Object.assign(this.detail_history, {
          id,
          order_id,
          cashier_name,
          customer_name,
          ppn_amount,
          total_amount,
          created_at,
          updated_at,
          item_order: this.data_order.item_order.split(','),
        })

        this.stateStruck = true
      }
    },
    handleSearching() {
      this.params.page = 1
      this.load()
    },
  },
}
</script>
