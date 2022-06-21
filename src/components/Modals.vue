<template>
  <v-dialog v-model="state_modal" max-width="300" height="1000" persistent>
    <v-card class="py-8 text-center">
      <v-icon :color="stateSuccess ? '#00BF71' : 'error'" size="80">
        {{ stateSuccess ? 'mdi-cart-check' : 'mdi-close-circle' }}
      </v-icon>
      <v-card-text class="black--text my-2">
        {{ stateSuccess ? 'Success' : 'Failed' }}
      </v-card-text>
      <v-card-actions>
        <v-btn
          elevation="0"
          block
          outlined
          :color="stateSuccess ? '#00BF71' : 'error'"
          class="rounded-lg"
          @click="handleCloseModal"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    state_modal: { type: Boolean, default: false },
    stateSuccess: { type: Boolean, default: false },
    handleCloseModal: { type: Function, default: () => {} },
  },
}
</script>
