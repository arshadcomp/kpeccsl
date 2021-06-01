<template>
	<v-card v-if="loaded" width="300">
		<ProductImage :imgUrl="product.image" :hsn="product.hsn" />
		<v-card-text class="pa-1">
			<v-list dense>
				<v-list-item three-line>
					<v-list-item-content>
						<v-list-item-subtitle>
							{{ product.name }}
						</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
				<v-divider></v-divider>

				<v-list-item>
					<v-list-item-icon>
						<small>Seller</small>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>
							<small class="text--success">{{ seller.name  }}</small> 
						</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-divider></v-divider>

				<v-list-item>
					<v-list-item-content>
						<v-list-item-subtitle class="text-right">{{
							product.id
						}}</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
				<v-divider></v-divider>

				<v-list-item>
					<v-list-item-icon>
						<v-icon small color="indigo"> mdi-barcode </v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>Code</v-list-item-title>
					</v-list-item-content>
					<v-list-item-content>
						<v-list-item-subtitle class="text-right">{{
							product.code
						}}</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
				<v-divider></v-divider>

				<v-list-item>
					<v-list-item-icon>
						<v-icon small color="indigo"> mdi-currency-inr </v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>Price</v-list-item-title>
					</v-list-item-content>
					<v-list-item-content>
						<v-list-item-subtitle class="text-right">{{
							product.price
						}}</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
				<v-divider></v-divider>

				<v-list-item>
					<v-list-item-icon>
						<v-icon small color="indigo"> mdi-tray-full</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>Stock</v-list-item-title>
					</v-list-item-content>
					<v-list-item-content>
						<v-list-item-subtitle class="text-right">{{
							product.inventory.stock
						}}</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
				<v-divider></v-divider>

				<v-list-item>
					<v-list-item-icon>
						<v-icon small color="indigo"> mdi-currency-inr </v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>HSN</v-list-item-title>
					</v-list-item-content>
					<v-list-item-content>
						<v-list-item-subtitle class="text-right">{{
							product.hsn
						}}</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
				<v-divider></v-divider>
			</v-list>
		</v-card-text>
		<v-card-actions>
			<v-btn color="secondary" small @click="view"> VIEW </v-btn>
			<v-btn color="secondary" small @click="update" class="mr-2"> UPDATE </v-btn>

			<v-dialog v-model="dialog" persistent max-width="600px">
				<template v-slot:activator="{ on, attrs }">
					<v-btn color="primary" small dark v-bind="attrs" v-on="on">
						UPDATE STOCK
					</v-btn>
				</template>
				<v-card>
					<v-card-title>
						<span class="headline">Update Stock for {{ product.name }}</span>
					</v-card-title>
					<v-card-text>
						<v-text-field
							label="Stock"
							v-model = product.inventory.stock
							required
						></v-text-field>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="blue darken-1" text @click="dialog = false">
							Close
						</v-btn>
						<v-btn color="blue darken-1" text @click="updateStock">
							Update
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</v-card-actions>
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
	name: "product-item",
	props: {
		id: {
			type: String,
			required: true,
		},
	},
	data: () => ({
		dialog: false,
	}),
	async mounted() {
		if (this.product === undefined || this.product.inventory === undefined)
			await this.$store.dispatch("getProduct", this.product.id);
	},
	computed: {
		product() {
			// const product = this.$store.getters.productById(this.id)
			// console.log('PRODUCT', product)
			return this.$store.getters.productById(this.id);
		},
		seller() {
			return  this.$store.getters.sellerById(this.product.sellerID || 1)
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
		view() {
			this.$store.commit("SET_PRODUCT", this.product);
			this.$router.push({ path: "/product/view" });
		},
		updateStock() {
			this.dialog = false
			this.$store.dispatch('updateInventory', { id: this.product.inventory.id, stock: parseFloat(this.product.inventory.stock) })
		}
	},
	components: {
		ProductImage,
	},
};
</script>
