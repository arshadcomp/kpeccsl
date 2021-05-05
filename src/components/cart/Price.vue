<template>
	<v-sheet v-if="cart.length > 0" elevation="4" class="pa-0 pa-md-4">
		<v-list
			subheader
			two-lines
		>
			<v-subheader>PRICE DETAILS</v-subheader>
			<v-list-item v-for="product in cart" :key="product.id">
				<v-list-item-avatar>
          <v-icon
            class="grey lighten-1"
            dark
          >
            mdi-basket
          </v-icon>
        </v-list-item-avatar>
				<v-list-item-content>
          <v-list-item-title>{{ product.name }}</v-list-item-title>

          <v-list-item-subtitle>&#8377; {{ product.price }} X {{ product.quantity }}</v-list-item-subtitle>
        </v-list-item-content>
				<v-list-item-icon>
					&#8377; {{ product.price*product.quantity }}
				</v-list-item-icon>
			</v-list-item>
			<v-divider></v-divider>
			<v-list-item v-if="amount > minCartAmount" >
				<v-list-item-title>Delivery Charges</v-list-item-title>
				<v-list-item-icon class="green--text">
					FREE
				</v-list-item-icon>
			</v-list-item>
			<v-divider></v-divider>
		</v-list>

		<v-card
			class="d-flex justify-space-between mb-3"
			flat
		>
			<v-card flat>
				<v-card-title> Total Amount </v-card-title>
			</v-card>
			<v-card flat>
				<v-card-title> &#8377; {{ amount }} </v-card-title>
			</v-card>

		</v-card>



	</v-sheet>
	<v-sheet v-else elevation="4" class="text-center pa-4" >
		<v-avatar
      color="indigo"
			size="164"
    >
      <v-icon dark size="120">
        mdi-basket-off
      </v-icon>
    </v-avatar>
		<p class="mt-3">Goto</p>
		<v-btn :to="'/orders'" x-large color="primary">MY ORDERS</v-btn>
		<p class="mt-3">to track your order</p>
	</v-sheet>
</template>

<script>
export default {
	name: 'CartPrice',
	data() {
		return {
			cart: this.$store.state.cart
		}
	},
	computed: {
		amount() {
			let amount = 0;
			this.cart.forEach(element => {
				amount = amount + element.price*element.quantity
			});
			return amount;
		},
		minCartAmount() {
			return this.$store.state.minCartAmount
		}
	}
}
</script>