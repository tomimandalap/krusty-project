<template>
  <v-dialog v-model="stateStruck" max-width="300" height="1000" persistent>
    <v-card class="py-8">
      <v-card-text
        class="d-flex justify-space-between align-center black--text py-1"
      >
        <span>Order ID :</span>
        <span>{{ data_order.order_id ? data_order.order_id : '-' }}</span>
      </v-card-text>
      <v-card-text
        class="d-flex justify-space-between align-center black--text py-1"
      >
        <span>Cashier :</span>
        <span>
          {{ data_order.cashier_name ? data_order.cashier_name : '-' }}
        </span>
      </v-card-text>
      <v-card-text
        class="d-flex justify-space-between align-center black--text py-1"
      >
        <span>Customer :</span>
        <span>
          {{ data_order.customer_name ? data_order.customer_name : '-' }}
        </span>
      </v-card-text>

      <v-card-text class="font-weight-bold black--text py-1">
        Pemesanan
      </v-card-text>

      <v-card-text
        v-for="(items, i) in data_order.item_order"
        :key="i"
        :class="[
          'd-flex align-center black--text py-1',
          {
            'justify-space-between': !mode_struck,
            'justify-start text-truncate': mode_struck,
          },
        ]"
      >
        <span v-if="mode_struck">
          {{ items }}
        </span>

        <span v-if="!mode_struck">
          {{
            items.name.length > 15
              ? `${items.name.substr(0, 15)}...`
              : items.name
          }}
        </span>
        <span v-if="!mode_struck">
          x{{ items.quality }} {{ formatCurrency(items.sub_total) }}
        </span>
      </v-card-text>

      <v-card-text
        class="d-flex justify-space-between align-center black--text py-1"
      >
        <span>PPN</span>
        <span>{{ formatCurrency(data_order.ppn_amount) }}</span>
      </v-card-text>

      <v-card-text class="py-2">
        <hr />
      </v-card-text>

      <v-card-text
        class="d-flex justify-space-between align-center black--text py-1"
      >
        <span>Total</span>
        <span>{{ formatCurrency(data_order.total_amount) }}</span>
      </v-card-text>

      <v-card-actions class="d-block">
        <v-btn
          v-if="!mode_struck"
          :loading="loadingPayment"
          block
          dense
          elevation="0"
          color="#ffe600"
          class="text-capitalize b-primary rounded-lg my-5"
          @click="handlePayment"
        >
          Payment
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn
          block
          dense
          outlined
          elevation="0"
          color="#ff0000"
          :class="['text-capitalize rounded-lg', { 'mt-5': mode_struck }]"
          @click="handleClose"
        >
          {{ mode_struck ? 'Close' : 'Cancel' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import convertion from '@/utils/convertion'
export default {
  name: 'modalStruck',
  props: {
    loadingPayment: { type: Boolean, default: false },
    mode_struck: { type: Boolean, default: false },
    stateStruck: { type: Boolean, default: false },
    data_order: { type: Object, default: () => {} },
    handleClose: { type: Function, default: () => {} },
    handlePayment: { type: Function, default: () => {} },
  },
  mixins: [convertion],
}
</script>
