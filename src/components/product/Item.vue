<template>
	<v-card flat v-if="$vuetify.breakpoint.mobile" @click.stop="cardClicked">
		<template v-if="loaded">
			<v-list-item three-line>
				<v-list-item-avatar rounded size="100" color="grey">
					<ProductImage :imgUrl="product.image" :hsn="product.hsn" />
				</v-list-item-avatar>
				<v-list-item-content>
					<ProductName :name="product.name" :seller="product.seller" />
					<v-list-item-title class="mb-1">
						<ProductPrice :product="product" />
					</v-list-item-title>
					<Button v-if="product.inventory" :id="product.id" :stock="product.inventory.stock" />
				</v-list-item-content>
			</v-list-item>
			<v-divider></v-divider>
		</template>
		<template v-else>
			<v-skeleton-loader
				class="mx-auto"
				max-width="300"
				type="list-item-avatar-three-line"
			></v-skeleton-loader>
		</template>
	</v-card>
	<v-card v-else max-width="300" @click.stop="cardClicked">
		<template v-if="loaded">
			<ProductImage :imgUrl="product.image" :hsn="product.hsn" />
			<v-card-title>
				<v-list-item three-line class="pa-0">
					<v-list-item-content class="pa-0">
						<ProductName :name="product.name" :seller="product.seller" />
					</v-list-item-content>
				</v-list-item>
			</v-card-title>
			<v-card-text>
				<ProductPrice :product="product" />
			</v-card-text>
			<v-card-actions>
				<Button v-if="product.inventory" :id="product.id" :stock="product.inventory.stock" />
			</v-card-actions>
		</template>
		<template v-else>
			<v-skeleton-loader
				class="mx-auto"
				max-width="300"
				type="card"
			></v-skeleton-loader>
		</template>
	</v-card>
</template>

<script>
import ProductName from "@/components/product/Name.vue";
import ProductImage from "@/components/product/Image.vue";
import Button from '@/components/product/Button.vue'
import ProductPrice from '@/components/product/Price'

export default {
	name: "product-item",
	props: {
		id: {
			type: String,
			required: true,
		},
	},
	async mounted() {
		if (this.product.inventory === undefined)
			await this.$store.dispatch("getProduct", this.product.id);
	},
	components: {
		ProductName,
		ProductImage,
		Button,
		ProductPrice
	},
	computed: {
		loaded() {
			return this.product && this.product.inventory;
		},
		product() {
			return this.$store.getters.productById(this.id);
		},
	},
	methods: {
		price(product) {
			return product.price*product.leastCount
		},
		mrp(product) {
			return product.mrp*product.leastCount
		},
		discount(product) {
			if(product.mrp !== 0 && product.price !==0)
				return Math.floor(((product.mrp - product.price)/product.mrp)*100) + '% off'
			return ''
		},
		minQuantity(product) {
			if(product.leastCount!==1 && product.unit.toLowerCase()=='kg')
				return 'Min Qty: '+product.leastCount*1000 +' g'
			return false
		},
		cardClicked() {
			this.$router.push({ path: "/product/" + this.product.id });
		},
	},
};
</script>