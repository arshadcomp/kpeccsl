<template>
	<div v-if="$vuetify.breakpoint.mobile">
		<div class="d-flex flex-no-wrap justify-space-between">				
			<v-list-item-avatar
				size="80"
				color="grey"
				rounded
			>
			<ProductImage :imageUrl="product.image" :hsn="product.hsn"/>
			</v-list-item-avatar>
			<v-list-item-content>
				<!-- <ProductName :name="product.name" class="mb-3" /> -->
				<v-list-item-subtitle class="text-truncate">
					<!-- <ProductName :name="product.name" :truncate=true class="mb-3" /> -->
					{{product.name}}
				</v-list-item-subtitle>
				<v-list-item-title>
					<ProductPrice :product="product" class="mb-3" />
					<!-- <span class="black--text font-weight-black mr-3">&#8377; {{product.price}}</span>
					<span class="grey--text text-decoration-line-through mr-3">{{product.mrp}}</span>
					<span class="green--text">{{ Math.floor(((product.mrp - product.price)/product.mrp)*100) }}% off </span> -->
				</v-list-item-title>
				<ProductButton v-if="product.inventory" :id="product.id" :stock="product.inventory.stock" />
			</v-list-item-content>
		</div>
		<v-divider></v-divider>
	</div>
	<v-card
		v-else
		:loading="loading"
		@click="cardClicked"
	>
		<template slot="progress">
			<v-progress-linear
				color="deep-purple"
				height="10"
				indeterminate
			></v-progress-linear>
		</template>

		<ProductImage :imageUrl="product.image" :hsn="product.hsn"/>
		
		<v-card-title> <ProductName :name="product.name" :truncate=true /></v-card-title>
		<!-- <ProductName :name="product.name" class="mb-3" /> -->
		<!-- <v-subheader class="black--text">{{product.name}}</v-subheader> -->
		<v-card-text>
			<ProductPrice :product="product" class="mb-3" />
			<!-- <h3>
				<span class="black--text font-weight-black mr-3">&#8377; {{product.price}}</span>
				<span class="grey--text text-decoration-line-through mr-3">{{product.mrp}}</span>
				<span class="green--text">{{ Math.floor(((product.mrp - product.price)/product.mrp)*100) }}% off </span>
			</h3> -->
			<!-- <v-subheader>Stock: {{product.inventory.stock}}</v-subheader> -->
		</v-card-text>
		<v-divider class="mx-4"></v-divider>
		<ProductButton v-if="product.inventory" :id="product.id" :stock="product.inventory.stock" />
		
		<!-- <ProductButton :product="product" /> -->
	</v-card>
</template>

<script>
import ProductName from '@/components/product/Name'
import ProductImage from '@/components/product/Image.vue'
import ProductButton from '@/components/product/Button.vue'
import ProductPrice from '@/components/product/Price'

export default {
	name: 'product-item',
	props: ['product'],
	components: {
		ProductImage,
		ProductButton,
		ProductPrice,
		ProductName
	},
	data: () => ({
		loading: false,
	}),
	methods: {
		cardClicked() {
			this.$router.push({path:'/product/'+this.product.id })
		}
	}
}
</script>