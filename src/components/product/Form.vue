<template>
  <v-form>
    <v-text-field
      v-model="product.code"
      :counter="100"
      label="Material Code"
      required
    ></v-text-field>
    <v-text-field
      v-model="product.name"
      :counter="100"
      label="Name"
      required
    ></v-text-field>
    <v-text-field
      v-model="product.keyword"
      :counter="100"
      label="Keywords"
      required
    ></v-text-field>
    <v-text-field
      v-model="product.hsn"
      :counter="100"
      label="Category"
      required
    ></v-text-field>
    <v-textarea
      v-model="product.description"
      label="Description"
    ></v-textarea>
    <v-text-field
      v-model="product.image"
      :counter="100"
      label="Image"
    ></v-text-field>
    <v-text-field
      v-model="product.unit"
      label="Measurement Unit"
    ></v-text-field>
    <v-text-field
      v-model="product.tax"
      label="Taxable"
    ></v-text-field>
    <v-text-field
      v-model="product.purchase_rate"
      :counter="100"
      label="Purchase Rate"
    ></v-text-field>
    <v-text-field
      v-model="product.mrp"
      label="MRP"
    ></v-text-field>
    <v-text-field
      v-model="product.rate"
      label="Rate"
    ></v-text-field>
    
    <v-text-field
      v-model="product.gst"
      label="GST"
    ></v-text-field>
    <v-text-field
      v-model="product.price"
      label="Price"
    ></v-text-field>

    <v-checkbox
      v-model="product.featured"
      label="Featured"
    ></v-checkbox>

    <v-btn
      color="warning"
      @click="saveProduct"
    >
      Submit
    </v-btn>
  </v-form>
</template>

<script>
  export default {
    props: ['product', 'isEditing'],
    methods: {
      saveProduct () {
        delete this.product.createdAt
        delete this.product.updatedAt
        delete this.product.inventory
        this.product.purchase_rate = parseFloat(this.product.purchase_rate)
        this.product.mrp = parseFloat(this.product.mrp)
        this.product.rate = parseFloat(this.product.rate)
        this.product.gst = parseFloat(this.product.gst)
        this.product.price = parseFloat(this.product.price)
				this.$store.dispatch('updateProduct', this.product)
      }
    }
  }
</script>
