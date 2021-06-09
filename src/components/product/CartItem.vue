<template>
	<v-card
    class="mx-auto mb-3"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline">
          {{product.name}}
        </div>
				<div class="mb-4">
					<small>Seller: {{product.seller ? product.seller.name : 'KPECCSL'}}</small>
				</div>
        <v-list-item-title class="headline mb-1">
          &#8377; {{product.price}}
        </v-list-item-title>
        <v-list-item-subtitle>Delivery in 1-2 day <!--| <span class="green--text">Free</span>--> </v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar
        rounded
        size="80"
      >
				<ProductImage :imageUrl="product.image" :hsn="product.hsn"/>
			</v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn-toggle
				rounded
				class="mr-3"
				v-if="this.product.inventory.stock > 0"
			>
				<v-btn @click="decrement">
					<v-icon>mdi-minus-circle</v-icon>
				</v-btn>
				<v-btn>
					{{product.quantity}}
				</v-btn>
				<v-btn @click="increment">
					<v-icon>mdi-plus-circle</v-icon>
				</v-btn>
			</v-btn-toggle>
			<v-btn
				v-else
				disabled
				outlined
				rounded
			>
				Out of Stock
			</v-btn>

			<v-btn color="error" text @click="remove">
				<v-icon>mdi-delete</v-icon>
				REMOVE
			</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
	import ProductImage from './Image.vue'
	
  export default {
		name: 'cart-item',
		// created() {
		// 	console.log('ITEM', this.product)
		// },
		props: {
			product: {
				type: Object,
				required: true
			}
		},
    methods : {
      increment() {
				// if(this.product.inventory.stock === undefined || this.product.inventory.stock === 0 || this.product.quantity === this.product.inventory.stock) return
				// this.$store.dispatch('incrementCartQuantity', this.product)
				this.$store.commit('INCREMENT_CART_QUANTITY', this.product)
			},
			decrement() {
				// if(this.product.quantity === this.product.leastCount) return
				// this.$store.dispatch('decrementCartQuantity', this.product)
				this.$store.commit('DECREMENT_CART_QUANTITY', this.product)
			},
			remove() {
				// this.$store.dispatch('removeFromCart', this.product.id)
				this.$store.commit('REMOVE_FROM_CART', this.product)
			}
		},
		components: {
			ProductImage
		}
  }
</script>