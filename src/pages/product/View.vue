<template>
	<v-card v-if="loaded">
		<v-row>
			<v-col cols="4">
				<ProductImage :imgUrl="product.image" :hsn="product.hsn" large />
			</v-col>
			<v-col cols="8">
				<h2>{{ product.name }}</h2>
				<p>Stock: {{ product.inventory.stock }}</p>
				<v-card-actions>
					<v-btn @click="update" color="primary"> UPDATE </v-btn>
				</v-card-actions>
			</v-col>
		</v-row>
	</v-card>
	<v-skeleton-loader
		v-else
		class="mx-auto"
		max-width="300"
		type="card"
	></v-skeleton-loader>
</template>

<script>
import ProductImage from "@/components/product/Image";

export default {
	name: "product-view",
	mounted() {
		if (this.product === undefined || this.product.inventory === undefined)
			this.$store.dispatch("getProduct", this.product.id);
	},
	computed: {
		product() {
			return this.$store.getters.product;
		},
		loaded() {
			return this.product && this.product.inventory;
		},
	},
	methods: {
		update() {
			this.$store.commit("SET_PRODUCT", this.product);
			this.$router.push({ name: "ProductUpdate" });
		},
	},
	components: {
		ProductImage,
	},
};
</script>
