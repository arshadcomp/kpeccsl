<template>
	<v-sheet>
		<v-row class="mx-n3 d-none d-md-flex">
			<v-col cols="12" sm="8" >
				<h2 class="mb-6">MY ORDERS</h2>
				<OrderItems/>
			</v-col>
			<v-col cols="0" sm="4">
				<v-card class="pa-3" flat>
					<v-card-title>Important Information</v-card-title>
					<v-alert
						border="left"
						color="indigo"
						icon="mdi-package"
						dark
						prominent
					>
						<h2>Delivery</h2>
						<p>To ensure your safety, the Delivery Agent will drop the package at your doorstep, ring the doorbell and then move back 2 meters while waiting for you to collect your package. If you are in a containment, the agent will call you and request you to collect your package from the nearest accessible point while following the same No-Contact delivery process. </p>
					</v-alert>
					<v-alert
						border="left"
						color="#C51162"
						icon="mdi-currency-inr"
						dark
						prominent
					>
						<h2>Payment</h2>
						<p>Please verify the contents of the package before making payment. Items are not returnable.</p>
					</v-alert>
				</v-card>
			</v-col>
		</v-row>
		<v-sheet class="mx-n3 d-flex d-md-none">
			<OrderItems/>
			<!-- <v-card
				flat
			>
				<v-list three-line>
					<v-subheader>MY ORDERS</v-subheader>
					<v-list-item-group v-for="order in orders" :key="order.id">
						<v-list-item v-for="item in order.items" :key="item.id" :to="'/order/'+order.id">
							<v-list-item-avatar
								rounded
							>
							<v-img :src="item.image"></v-img>
							</v-list-item-avatar>
							<v-list-item-content>
								<v-list-item-title v-html="order.status" class="error--text"></v-list-item-title>
								<v-list-item-subtitle v-html="item.name"></v-list-item-subtitle>
							</v-list-item-content>
							<v-list-item-action>
								<v-btn icon>
									<v-icon color="grey lighten-1">mdi-chevron-right</v-icon>
								</v-btn>
							</v-list-item-action>
						</v-list-item>
						<v-divider></v-divider>
					</v-list-item-group>
				</v-list>
			</v-card> -->
		</v-sheet>

	</v-sheet>
</template>

<script>
import OrderItems from '@/components/order/Items'

export default {
	created() {
		this.$store.dispatch('myOrders')
	},
	data()  {
		return {
		}
	},
	computed: {
		orders() {
			return this.$store.getters.orders
		}
	},
	components : {
		OrderItems
	},
	methods: {
		amount(items) {
			return items.reduce(function (accumulator, item) {
					return accumulator + item.price*item.quantity
			}, 0)
		}
	}
}
</script>