<template>
  <LayoutDefault>
    <v-container fluid class="py-4 ps-10 pe-10">
      <Breadcrumbs :menu="menu" />

      <v-card class="my-5">
        <v-card-title>
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
        </v-card-title>
        <v-data-table :headers="headers" :items="datas" :search="params.q">
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
              {{ item.customer }}
            </v-chip>
          </template>
          <template #[`item.total`]="{ item }">
            <div class="text-truncate">{{ formatCurrency(item.total) }}</div>
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
        :stateStruck="stateStruck"
        :data_order="data_order"
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
import LayoutDefault from '@/layouts/default'
import convertion from '@/utils/convertion'
export default {
  name: 'History',
  mixins: [globalMenu, convertion],
  components: { Breadcrumbs, LayoutDefault, Struck },
  data() {
    return {
      menu: [],
      params: {
        q: '',
        sort_by: '',
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
        { text: 'Cashier', align: 'start', value: 'cashier', width: '25%' },
        { text: 'Cash', align: 'start', value: 'total', width: '15%' },
        { text: 'Created', align: 'center', value: 'created', width: '20%' },
        { text: '', align: 'center', value: 'actions', width: '15%' },
      ],
      datas: [
        {
          id: 1,
          order_id: '20220101KRUSTY150010',
          customer: 'Tomi',
          cashier: 'Salsabila',
          total: 100000,
          created: '20220101',
        },
      ],
      stateStruck: false,
      data_order: {
        order_id: '20220101KRUSTY150010',
        name: 'Tomi',
        cashier: 'Salsabila',
        list_cart: [],
        ppn: 10000,
        total: 100000,
      },
    }
  },
  computed: {
    getAccess() {
      return parseInt(this.$store.getters['users/getAccess'])
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
  },
  methods: {
    handleDetail(order_id) {
      console.log(order_id)
      this.stateStruck = true
    },
  },
}
</script>
