<template>
  <div :class="$vuetify.breakpoint.width >= 768 ? 'content-center' : 'pa-5'">
    <h3>{{ title }}</h3>
    <p class="mt-3 mb-5">
      {{ sub_title }}
    </p>

    <v-form @submit.prevent="handleSubmit">
      <label v-if="state_form" for="formname">
        Name
        <span class="red--text">*</span>
      </label>
      <v-text-field
        v-if="state_form"
        id="formname"
        ref="formname"
        v-model="form.name"
        outlined
        color="black"
        placeholder="Input your E-mail"
        class="rounded-lg"
        :error-messages="
          $v.form.name.$dirty && !$v.form.name.required
            ? 'Name is required'
            : $v.form.name.$dirty && !$v.form.name.minLength
            ? 'must have at least 4 letters'
            : $v.form.name.$dirty && !$v.form.name.onlyText
            ? 'Input must be alphabet characters'
            : []
        "
        @blur="$v.form.name.$touch()"
      ></v-text-field>
      <label for="formemail">
        E-mail
        <span class="red--text">*</span>
      </label>
      <v-text-field
        id="formemail"
        ref="formemail"
        v-model="form.email"
        outlined
        color="black"
        placeholder="Input your E-mail"
        class="rounded-lg"
        maxLength="50"
        :error-messages="
          $v.form.email.$dirty && !$v.form.email.required
            ? 'Email is required'
            : $v.form.email.$dirty && !$v.form.email.email
            ? 'Email invalid'
            : []
        "
        @blur="$v.form.email.$touch()"
      ></v-text-field>
      <label for="formpassword">
        Password
        <span class="red--text">*</span>
      </label>
      <v-text-field
        id="formpassword"
        ref="formpassword"
        v-model="form.password"
        :type="show ? 'text' : 'password'"
        outlined
        color="black"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        placeholder="Input your password"
        class="rounded-lg"
        @click:append="show = !show"
        maxLength="20"
        :error-messages="
          $v.form.password.$dirty && !$v.form.password.required
            ? 'Password is required'
            : $v.form.password.$dirty && !$v.form.password.minLength
            ? 'Password must have at least 8 letters'
            : $v.form.password.$dirty && !$v.form.password.onlyPassword
            ? 'Example: Password1'
            : []
        "
        @blur="$v.form.password.$touch()"
      ></v-text-field>

      <router-link
        v-if="!state_form"
        to="/forgotpassword"
        class="float-right mt-4 mb-10"
      >
        Forgot Password
      </router-link>

      <v-btn
        type="submit"
        :loading="loading"
        elevation="0"
        block
        large
        color="#FFE600"
        class="text-capitalize"
      >
        Login
      </v-btn>

      <p v-if="!state_form" class="my-10 text-center">
        Don't have an account? please
        <router-link to="/register">register</router-link>
        .
      </p>
      <p v-else class="my-10 text-center">
        Already have an account? please
        <router-link to="/login">login</router-link>
        .
      </p>
    </v-form>

    <p class="c_text mt-12 text-center">&copy; 2021 - Krusty POS</p>
  </div>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, email, minLength, helpers } from 'vuelidate/lib/validators'
const onlyText = helpers.regex('onlyText', /^[a-zA-Z ]*$/)
const onlyPassword = helpers.regex(
  'onlyPassword',
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
)
export default {
  name: 'Forms',
  mixins: [validationMixin],
  props: {
    // handleSubmit: { type: Function, default: () => {} },
    state_form: { type: Boolean, default: false },
    title: { type: String, default: 'Login' },
    sub_title: {
      type: String,
      default:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, sit.',
    },
  },
  data() {
    return {
      show: false,
      form: {
        name: '',
        email: '',
        password: '',
      },
    }
  },
  validations() {
    return {
      form: {
        name: this.state_form
          ? { required, minLength: minLength(4), onlyText }
          : {},
        email: { required, email },
        password: {
          required,
          minLength: minLength(8),
          onlyPassword,
        },
      },
    }
  },
  computed: {
    loading() {
      return this.$store.state['users'].loading
    },
    show_alert() {
      return this.$store.state['users'].show_alert
    },
    status() {
      return this.$store.state['users'].status
    },
    alert_title() {
      return this.$store.state['users'].alert_title
    },
    alert_message() {
      return this.$store.state['users'].alert_message
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
      this.$store.commit('users/setShow', false)
    },
  },
  methods: {
    handleSubmit() {
      this.$v.$touch()

      for (const key of Object.keys(this.form).reverse()) {
        if (this.$v.form[key] && this.$refs[key]) {
          if (this.$v.form[key].$dirty && this.$v.form[key].$invalid) {
            this.$refs[key].focus()
          }
        }
      }

      if (this.$v.$invalid) {
        return false
      }

      // login
      if (!this.state_form) {
        delete this.form.name
        this.handleLogin(this.form)
      } else {
        this.handleRegister(this.form) // register
      }
    },
    async handleLogin(data) {
      this.$store.commit('users/setLoading', true)
      const res = await this.$store.dispatch('users/login', data)
      if (res) this.$router.push('/')
    },
    async handleRegister(data) {
      this.$store.commit('users/setLoading', true)
      const res = await this.$store.dispatch('users/register', data)
      if (res) this.$router.push('/login')
    },
  },
}
</script>
