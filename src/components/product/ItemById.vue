<template>
	<div v-if="$vuetify.breakpoint.mobile">
		<div class="d-flex flex-no-wrap justify-space-between align-start">				
			<v-list-item-avatar
				size="80"
				color="grey"
				rounded
			>
			<ProductImage :imageUrl="product.image" :hsn="product.hsn" />
			</v-list-item-avatar>
			<v-list-item-content>
				<v-list-item-subtitle class="text-truncate">
					{{product.name}}
				</v-list-item-subtitle>
				<v-list-item-title>
					<ProductPrice :product="product" class="mb-3" />
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
		width="280"
	>
		<template slot="progress">
			<v-progress-linear
				color="deep-purple"
				height="10"
				indeterminate
			></v-progress-linear>
		</template>

		<ProductImage :imageUrl="product.image" :hsn="product.hsn"/>
		
		<v-card-title>
			<v-list dense>
				<v-list-item three-line class="pa-0">
					<v-list-item-content>
						<v-list-item-subtitle>
							<ProductName :name="product.name" />
						</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
				<v-list-item class="pa-0">
					<v-list-item-content>
						<v-list-item-subtitle>
							<small>Seller: {{product.seller ? product.seller.name : 'KPECCSL'}}</small>
						</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
			</v-list>
			<!-- <ProductName :name="product.name" :truncate=true /> -->
		</v-card-title>
		<v-card-subtitle>
			<v-list dense>
				<v-list-item class="pa-0">
					<v-list-item-content>
						<v-list-item-title  class="text-h6">
							&#8377;{{product.price}}
						</v-list-item-title>
					</v-list-item-content>
					<v-list-item-content>
						<v-list-item-subtitle>
							<span class="subtitle-1 grey--text text-decoration-line-through mr-3">&#8377;{{product.mrp}}</span> <span class="green--text">{{ Math.floor(((product.mrp - product.price)/product.mrp)*100) }}% off</span>
						</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-card-subtitle>

		<!-- <v-card-text>
			<ProductPrice :product="product" class="mb-3" />
		</v-card-text> -->
		<v-divider class="mx-4"></v-divider>
		<v-card-actions>
			<ProductButton v-if="product.inventory" :id="product.id" :stock="product.inventory.stock" />
		</v-card-actions>
	</v-card>
</template>

<script>
import ProductName from '@/components/product/Name'
import ProductImage from '@/components/product/Image.vue'
import ProductButton from '@/components/product/Button.vue'
import ProductPrice from '@/components/product/Price'

export default {
	name: 'product-item-by-id',
	async mounted() {
		this.product = await this.$store.dispatch('getProduct', this.id)
	},
	props: ['id'],
	// computed: {
	// 	product(){
	// 		return this.$store.dispatch('productById', this.id)
	// 	} 
	// },
	data() {
		return {
			product: {},
			loading: false,
		}
	},
	components: {
		ProductImage,
		ProductButton,
		ProductPrice,
		ProductName
	},
	methods: {
		cardClicked(){
			this.$router.push({path:'/product/'+this.product.id })
		}
	}
	// data: () => ({
	// 	loading: false,
	// })
}
</script>