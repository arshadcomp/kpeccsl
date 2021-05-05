<template>
	<div>
		<div v-if="$vuetify.breakpoint.mobile && this.loading">
			<v-skeleton-loader 
				v-for="n in 4" :key="n" type="list-item-avatar, card-heading, actions, divider"
			>
			</v-skeleton-loader>
		</div>

		<v-container fluid class="px-0" v-else-if="!$vuetify.breakpoint.mobile && this.loading">
			<v-row>
				<v-col v-for="n in 8" :key="n" cols="3">
					<v-skeleton-loader
						type="card, sentences, button"
					>
					</v-skeleton-loader>
				</v-col>
			</v-row>
		</v-container>
		
		
		<v-list v-if="$vuetify.breakpoint.mobile" three-line>
			
			<v-list-item v-for="product in products" :key="product.id" class="px-0" @click="goto(product.id)">
				<ProductItem :product="product"/>
			</v-list-item>
		</v-list>

		<v-container fluid class="px-0" v-else>
			<v-row>
				<v-col
          v-for="product in products"
          :key="product.id"
          :cols="$vuetify.breakpoint.mobile ? '12' : '3'"
        >
					<ProductItem :product="product"/>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script>
import ProductItem from '@/components/product/Item'

export default {
	name: 'product-items',
	props: ['withStock'],
	computed: {
		loading() {
			return this.$store.state.showLoader
		},
		products() {
			return this.withStock ?
				this.$store.getters.productsWithStock :
				this.$store.getters.allProducts
		}
	},
	components: {
		ProductItem
	},
	methods : {
		goto(id) {
			this.$router.push('/product/'+id)
		}
	}
}
</script>