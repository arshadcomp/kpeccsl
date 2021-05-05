<template>
	<v-row>
		<v-col :cols="12" :md="8" class="px-0 px-md-3">
			<v-stepper v-model="e1">
				<v-stepper-header>
					<v-stepper-step
						:complete="e1 > 1"
						step="1"
					>
						ITEMS
					</v-stepper-step>

					<v-divider></v-divider>

					<v-stepper-step
						:complete="e1 > 2"
						step="2"
					>
						CHECKOUT
					</v-stepper-step>

					<v-divider></v-divider>

					<v-stepper-step
						:complete="e1 > 3"
						step="3"
					>
						CONFIRM
					</v-stepper-step>

					<v-divider></v-divider>

					<v-stepper-step step="4">
						PAYMENT
					</v-stepper-step>
				</v-stepper-header>

				<v-stepper-items>
					<v-stepper-content step="1" class="px-0 px-md-6">
						<Items/>

						<v-btn 
							v-if="cart.length > 0 && stockAvailable && amount > minCartAmount" 
							x-large color="warning" 
							@click="e1 = 2"
							class="ml-3 ml-md-0"
						> 
							PLACE ORDER
						</v-btn>
						<v-btn 
							v-else 
							x-large 
							disabled
							class="ml-3 ml-md-0"
						> 
							PLACE ORDER
						</v-btn>

						<!-- <v-btn text @click="e1 = 1">
							Cancel
						</v-btn> -->
					</v-stepper-content>

					<v-stepper-content step="2" class="px-0 px-md-6">
						<Checkout/>

						<v-btn 
							x-large color="warning" 
							@click="e1 = 3"
							class="ml-3 ml-md-0"
						> 
							CONFIRM ORDER
						</v-btn>

						<v-btn text @click="e1 = 1">
							Cancel
						</v-btn>
					</v-stepper-content>

					<v-stepper-content step="3" class="px-0 px-md-6">
						<Confirm/>

						<v-btn 
							x-large color="warning" 
							@click="e1 = 4; confirmOrder()"
							class="ml-3 ml-md-0"
						> 
							MAKE PAYMENT
						</v-btn>

						<v-btn text @click="e1 = 2">
							Cancel
						</v-btn>
					</v-stepper-content>

					<v-stepper-content step="4">
						<Payment/>

						<v-btn
							x-large
							:disabled="this.loading"
							color="primary"
							:to="'/orders'"
						>
							MY ORDERS
						</v-btn>
					</v-stepper-content>
				</v-stepper-items>
			</v-stepper>
		</v-col>
		<v-col :cols="12" :md="4" class="px-0 px-md-3">
			<Price/>
		</v-col>
	</v-row>
</template>

<script>
import Price from '@/components/cart/Price'
import Items from '@/components/cart/Items'
import Checkout from '@/components/cart/Checkout'
import Confirm from '@/components/cart/Confirm'
import Payment from '@/components/cart/Payment'

// import { API } from 'aws-amplify';

// import { onCreateOrder } from '@/graphql/subscriptions';

export default {
	name: 'Cart',
	created() {
		// this.subscribeCreateOrder()
	},
	data () {
		return {
			e1: 1,
			// loading: true
		}
	},
	computed: {
		loading(){
			return this.$store.state.showloader
		},
		cart() {
			return this.$store.getters.cart
		},
		stockAvailable() {
			return this.cart.every(element => element.quantity > 0 );
		},
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
	},
	components: {
		Items,
		Price,
		Checkout,
		Confirm,
		Payment
	},
	methods: {
		confirmOrder() {
			this.createOrder()
		},
		createOrder(){
			// To ensure stock availability
			// for (let index = 0; index < this.cart.length; index++) {
			// 	const product = await this.getProduct(cart[index].id)
			// 	if(product.stock <=0)
			// 		delete cart[index]
			// }
			this.$store.dispatch('createOrder')
		},
		// async getProduct(id) {
		// 	return await this.dispatch('getProductById', id)
		// },
		// subscribeCreateOrder() {
		// 	API.graphql({ query: onCreateOrder, authMode: 'API_KEY' }).subscribe({
		// 		next: (eventData) => {
		// 			console.log('Order Created', eventData)
		// 			//remove from cart
		// 			this.loading = false
		// 			this.confirm = true
		// 			this.$store.dispatch('emptyCart')
		// 		}
		// 	});
		// },
	}
}
</script>