<template>
	<v-form ref="form" v-model="valid">
		<v-row>
			<v-col cols="12">
				<v-select
					v-model="product.sellerID"
					:disabled="!canUpdateSeller"
					:items="sellers"
					item-text="name"
					item-value="id"
					label="Seller"
					hint="Select Seller"
					persistent-hint
					outlined
					required
				></v-select>
			</v-col>
			<v-col cols="3">
				<v-text-field
					v-model="product.code"
					:counter="10"
					label="Material Code"
					hint="It's probably a number"
					:rules="[(v) => !!v || 'Name is required']"
					persistent-hint
					outlined
					required
				></v-text-field>
			</v-col>
			<v-col cols="3">
				<v-text-field
					v-model="product.hsn"
					:counter="100"
					label="HSN Code (Category)"
					hint="Enter the HSN code here, not the name of category"
					persistent-hint
					outlined
					required
				></v-text-field>
			</v-col>
			<v-col cols="6">
				<v-text-field
					v-model="product.name"
					:counter="100"
					label="Name"
					outlined
					required
				></v-text-field>
			</v-col>
		</v-row>

		<v-row>
			<v-col cols="6">
				<v-text-field
					v-model="product.keyword"
					:counter="100"
					label="Keywords"
					hint="Enter all the keywords which will make the product search easier."
					persistent-hint
					outlined
					required
				></v-text-field>
			</v-col>
			<v-col cols="6">
				<v-text-field
					v-model="product.image"
					:counter="100"
					label="Image"
					hint="Enter image URL. Ensure a working URL"
					persistent-hint
					outlined
				></v-text-field>
			</v-col>
			<v-col cols="2">
				<v-select
					v-model="product.tax"
					:items="['Taxable', 'Exempted']"
					label="Tax Details"
					outlined
					required
				></v-select>
			</v-col>

			<v-col cols="2">
				<v-text-field
					v-model="product.purchase_rate"
					:counter="10"
					:rules="currencyRules"
					label="Purchase Rate"
					hint="Enter purchase rate of the product"
					persistent-hint
					outlined
				></v-text-field>
			</v-col>
			<v-col cols="2">
				<v-text-field
					v-model="product.mrp"
					:counter="10"
					:rules="currencyRules"
					label="Maximum Retail Price (MRP)"
					hint="Enter MRP labelled on the product"
					persistent-hint
					outlined
				></v-text-field>
			</v-col>
			<v-col cols="2">
				<v-text-field
					v-model="product.rate"
					:counter="10"
					:rules="currencyRules"
					label="Rate without Tax"
					hint="Enter rate of the product without tax"
					persistent-hint
					outlined
				></v-text-field>
			</v-col>
			<v-col cols="2">
				<v-text-field
					v-model="product.gst"
					:counter="10"
					append-icon="mdi-percent"
					label="GST"
					hint="Enter GST percentage applicable on product"
					persistent-hint
					outlined
				></v-text-field>
			</v-col>
			<v-col cols="2">
				<v-text-field
					v-model="product.price"
					:counter="10"
					:rules="currencyRules"
					label="Selling price"
					hint="Final selling price of the product"
					persistent-hint
					outlined
				></v-text-field>
			</v-col>

			<v-col cols="2">
				<v-text-field
					v-model="product.unit"
					label="Measurement Unit"
					hint="Enter measurement unit like Kgs, nos etc."
					persistent-hint
					outlined
				></v-text-field>
			</v-col>

			<v-col cols="2">
				<v-text-field
					v-model="product.inventory.stock"
					:counter="6"
					:rules="currencyRules"
					label="Available Stock"
					hint="Enter the available inventory"
					persistent-hint
					outlined
				></v-text-field>
			</v-col>

			<v-col cols="2">
				<v-text-field
					v-model="product.leastCount"
					:counter="4"
					:rules="currencyRules"
					label="Minimum Purchase Quantity"
					hint="Enter minimum quantity that can be added to cart. Increment in cart will be in proportion to this value."
					persistent-hint
					outlined
				></v-text-field>
			</v-col>
			<v-col cols="12">
				<v-textarea
					v-model="product.description"
					label="Description"
					outlined
				></v-textarea>
			</v-col>
		</v-row>

		<v-checkbox v-model="product.featured" label="Featured"></v-checkbox>

		<v-btn color="warning" @click="submit" :disabled="loader">
			<v-icon v-if="loader">mdi-close</v-icon>
			{{ submitButtonName }}
		</v-btn>
	</v-form>
</template>

<script>
export default {
	name: "product-form",
	mounted() {
		this.product.sellerID = this.seller.id
	},
	data: () => ({
		valid: false,
		currencyRules: [
			(v) => !!v || "Required Field",
			(v) => /^\d*(\.\d{1,2})?$/.test(v) || "This must be a valid number",
		],
	}),
	props: {
		product: {
			type: Object,
			required: false,
			default: () => {
				return {
					code: "123",
					name: "New Product",
					keyword: "new product",
					hsn: "0192",
					description: "",
					image: "",
					unit: "nos",
					tax: "Taxable",
					purchase_rate: 1,
					mrp: 1.0,
					rate: 1.0,
					gst: 1.0,
					price: 1.0,
					leastCount: 1,
					inventory:{
						stock: 10
					},
					sellerID: 1
				};
			},
		}
	},
	computed: {
		loader() {
			return this.$store.getters.loader
		},
		submitButtonName() {
			return this.product.id ? "UPDATE PRODUCT" : "CREATE NEW PRODUCT";
		},
		seller() {
			return this.$store.getters.seller
		},
		sellers() {
			return this.$store.getters.sellers
		},
		canUpdateSeller() {
			return this.$store.getters.userRoles.findIndex(r => r==='Root') !== -1
		},
	},
	methods: {
		submit() {
			// console.log(this.product)
			this.product.purchase_rate = parseFloat(this.product.purchase_rate)
			this.product.mrp = parseFloat(this.product.mrp)
			this.product.rate = parseFloat(this.product.rate)
			this.product.gst = parseFloat(this.product.gst)
			this.product.price = parseFloat(this.product.price)
			this.product.inventory.stock = parseFloat(this.product.inventory.stock)
			this.product.leastCount = parseFloat(this.product.leastCount)

			if (this.$refs.form.validate())
				this.$emit("save", this.product);
		},
	},
};
</script>
