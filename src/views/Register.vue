<template>
  <AuthLayout>
    <v-row class="no-gutters register">
      <v-col lg="6" md="7" sm="12" cols="12" style="position: relative">
        <Forms :title="title" :sub_title="sub_title" :state_form="state_form" />
      </v-col>
      <v-col
        lg="6"
        md="5"
        class="bg_register d-md-block d-sm-none d-none"
      ></v-col>
    </v-row>
  </AuthLayout>
</template>
<script>
import AuthLayout from '@/layouts/auth'
import Forms from '@/components/Forms'
export default {
  name: 'Register',
  components: {
    AuthLayout,
    Forms,
  },
  data: () => ({
    title: 'Register',
    sub_title: 'form register krusty pos',
    state_form: true,
  }),
}
</script>
<style scoped>
.register {
  min-height: 100vh;
}
.bg_register {
  background-image: url('../assets/images/bg-login.png');
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
