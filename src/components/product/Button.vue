<template>

	<v-card-actions v-if="isAdminRoute">
		<!-- <v-btn
			color="info"
			text
		>
			View
		</v-btn> -->

		<v-btn
			color="info"
			text
			:to="{ path: '/admin/product/update/'+id }"
		>
			Update
		</v-btn>

		<v-btn
			color="info"
			text
			:to="{ path: '/admin/product/updatestock/'+id }"
		>
			Update Stock
		</v-btn>
		<!-- <v-btn
			color="orange"
			text
		>
			Delete
		</v-btn> -->
	</v-card-actions>
	<v-card-actions v-else-if="!inStock">
		<v-btn
			color="error"
			outlined
			disabled
			:small="$vuetify.breakpoint.mobile"
		>
			Out of Stock
		</v-btn>
	</v-card-actions>
	<v-card-actions v-else>
		<v-btn
			v-if="isAdding"
			color="warning"
			:small="$vuetify.breakpoint.mobile"
			@click.stop="addToCart"
		>
			<v-icon
        left
      >
        mdi-cart
      </v-icon>
			Add To Cart
		</v-btn>
		<v-btn
			v-else
			color="info"
			:small="$vuetify.breakpoint.mobile"
			outlined
			disabled
		>
			Item in Cart
		</v-btn>
	</v-card-actions>
</template>

<script>
  export default {
		name: 'product-button',
		props: ['id', 'stock'],
    computed: {
      cart() {
				return this.$store.getters.cart
      },
      isOpen() {
				return true
				// return this.$store.getters.storeStatus
      },
      // isAdding () {
      //   return this.cart.findIndex(p => p.id === this.product.id) < 0
			// },
			isAdding () {
        return this.cart.findIndex(p => p.id === this.id) < 0
      },
      // inStock() {
      //   return this.product.inventory.stock > 0
			// },
			inStock() {
        return this.stock > 0
			},
			isAdminRoute() {
				return this.$route.path.includes('admin')
			}
    },
    methods: {
      addToCart () {
				this.$store.dispatch('addToCart', this.id)
      }
    }
  }
</script>