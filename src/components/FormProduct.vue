<template>
  <v-form @submit.prevent="handleSubmit">
    <v-row :class="['my-2', { 'no-gutters': $vuetify.breakpoint.width < 960 }]">
      <v-col lg="3" md="4" sm="12" cols="12">
        <v-img
          :src="
            imageURL ? imageURL : require('@/assets/images/default-product.png')
          "
          contain
          width="100%"
          :max-height="$vuetify.breakpoint.width >= 960 ? 255 : 350"
          class="custom-img-product"
        ></v-img>

        <!-- v-model="form.image" -->
        <v-file-input
          id="formimage"
          ref="formimage"
          outlined
          show-size
          color="black"
          prepend-icon=""
          truncate-length="12"
          placeholder="Input file"
          prepend-inner-icon="mdi-image"
          accept="image/png, image/jpeg, image/jpg"
          class="my-5"
          :error-messages="
            $v.form.image.$dirty && !$v.form.image.required
              ? 'Image is required'
              : []
          "
          @blur="$v.form.image.$touch()"
          @change="inputImage($event)"
        >
          <template v-slot:selection="{ text }">
            <v-chip small label color="#ffe600">
              {{ text }}
            </v-chip>
          </template>
        </v-file-input>
      </v-col>

      <v-col lg="9" md="8" sm="12" cols="12">
        <label for="formname">
          <strong>Name</strong>
          <span class="red--text">*</span>
        </label>
        <v-text-field
          id="formname"
          ref="formname"
          v-model="form.name"
          outlined
          color="black"
          placeholder="Input product name"
          class="rounded-lg"
          maxLength="50"
          :error-messages="
            $v.form.name.$dirty && !$v.form.name.required
              ? 'Name is required'
              : $v.form.name.$dirty && !$v.form.name.alpha
              ? 'Input name only alphabet characters'
              : []
          "
          @blur="$v.form.name.$touch()"
        ></v-text-field>

        <label for="formcategory">
          <strong>Category</strong>
          <span class="red--text">*</span>
        </label>
        <v-select
          id="formcategory"
          ref="formcategory"
          v-model="form.category"
          outlined
          color="black"
          :items="listcategory"
          item-value="id"
          item-text="text"
          :menu-props="{ bottom: true, offsetY: true }"
          placeholder="Select category product"
          class="rounded-lg"
          :error-messages="
            $v.form.category.$dirty && !$v.form.category.required
              ? 'Category is required'
              : []
          "
          @blur="$v.form.category.$touch()"
        ></v-select>

        <label for="formprice">
          <strong>Price</strong>
          <span class="red--text">*</span>
        </label>
        <v-text-field
          id="formprice"
          ref="formprice"
          v-model="form.price"
          v-money="money"
          outlined
          color="black"
          prefix="Rp"
          class="rounded-lg"
          :error-messages="
            $v.form.price.$dirty &&
            (!$v.form.price.required || !$v.form.price.minimumPrice)
              ? 'Price is required and cant be zero (Rp 0)'
              : []
          "
          @blur="$v.form.price.$touch()"
        ></v-text-field>

        <label for="formdescription">
          <strong>Description</strong>
          <span class="red--text">*</span>
        </label>
        <v-textarea
          id="formdescription"
          ref="formdescription"
          v-model="form.description"
          counter
          outlined
          clearable
          color="black"
          placeholder="Input description"
          class="rounded-lg"
          :error-messages="
            $v.form.description.$dirty ? msgErrorDescription : []
          "
          @blur="$v.form.description.$touch()"
        ></v-textarea>
      </v-col>
    </v-row>

    <v-row>
      <v-col lg="12" class="d-flex justify-center align-center">
        <v-spacer></v-spacer>
        <v-btn
          elevation="0"
          width="150"
          color="#f0f0f0"
          class="text-capitalize me-5"
          @click="handleReset"
        >
          Reset
        </v-btn>

        <v-btn
          type="submit"
          elevation="0"
          width="150"
          color="#ffe600"
          class="text-capitalize"
        >
          Add Product
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>
<script>
import convertion from '@/utils/convertion'
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength, alpha } from 'vuelidate/lib/validators'
export default {
  name: 'formProduct',
  mixins: [convertion, validationMixin],
  data: () => ({
    imageURL: null,
    imageRAW: null,
    form: {
      name: '',
      category: '',
      price: 0,
      description: '',
      image: null,
    },
    listcategory: [
      {
        id: 1,
        text: 'Food',
      },
      {
        id: 2,
        text: 'Drink',
      },
    ],
    money: {
      decimal: ',',
      thousands: '.',
      prefix: '',
      suffix: '',
      precision: 0,
      masked: true,
    },
  }),
  validations() {
    return {
      form: {
        name: { required, alpha },
        category: { required },
        price: {
          required,
          minimumPrice: (value) => {
            let price = this.convertMoney(value)
            return !!price
          },
        },
        description: {
          required,
          minLength: minLength(10),
          maxLength: maxLength(250),
          alpha,
        },
        image: { required },
      },
    }
  },
  computed: {
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
    msgErrorDescription() {
      const errors = []
      !this.$v.form.description.required &&
        errors.push('Description is required')
      !this.$v.form.description.minLength &&
        errors.push('Description must have at least 10 letters')
      !this.$v.form.description.maxLength &&
        errors.push('Description must have at most 250 letters')
      !this.$v.form.description.alpha &&
        errors.push('Description only alphabet characters')
      return errors
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
  methods: {
    inputImage(files) {
      const image = files
      const { type } = image || { type: null }

      // check files
      if (files) {
        if (
          !type.includes('image/jpeg') &&
          !type.includes('image/jpg') &&
          !type.includes('image/png')
        ) {
          //set muttation notification
          this.$store.commit('products/setShow', true)
          this.$store.commit('products/setStatus', 'error')
          this.$store.commit('products/setTitle', 'File Image')
          this.$store.commit('products/setMessage', 'Wrong file extention!')
        } else {
          // insert file image
          this.imageURL = URL.createObjectURL(image)
          this.form.image = this.imageRAW = image
        }
      } else {
        this.form.image = this.imageURL = this.imageRAW = null
        this.$v.form.image.$reset()
      }
    },
    handleReset() {
      this.$v.form.$reset()

      // reset field price
      const input = this.$refs.formprice.$el.querySelector('input')
      input.value = 0

      this.imageURL = this.imageRAW = null
      this.$refs['formimage'].reset()

      this.form = {
        name: '',
        category: '',
        price: 0,
        description: '',
        image: null,
      }
    },
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

      // set formdata
      const formdata = new FormData()
      for (const [key, value] of Object.entries(this.form)) {
        formdata.append(key, key == 'price' ? this.convertMoney(value) : value)
      }

      console.log(formdata)
    },
  },
}
</script>
