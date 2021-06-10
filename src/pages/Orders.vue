<template>
	<v-row>
		<v-col cols="12" sm="8" class="pa-0 pa-md-6">
			<h2 class="mb-6 pa-6">MY ORDERS</h2>

			<template v-for="order in orders">
				<v-card outlined :key="order.id" class="mb-3">
					<v-card-title class="d-flex justify-space-between">
						<div>
							<p class="text-caption text-truncate">ORDER ID # {{ order.id }}</p>
							<p class="text-subtitle-1 text-truncate">DATE &amp; TIME: {{ new Date(order.createdAt).toLocaleDateString("en-GB") + ' '+new Date(order.createdAt).toLocaleTimeString("en-GB") }}</p>
						</div>
						<v-chip>{{order.status}}</v-chip>
					</v-card-title>
					<v-card-text>
						<v-container>
							<v-row>
								<v-col cols="12" lg="6">
									<v-list >
										<v-list-item v-for="product in order.items" :key="product.id">
											<v-list-item-icon>
											<v-avatar rounded>
												<ProductImage :imgUrl="product.image" :hsn="product.hsn" />
												<!-- <ProductImage :product="item"/> -->
											</v-avatar>
											</v-list-item-icon>
											<v-list-item-content>
												<v-list-item-title>
													{{product.name.split('*')[0]}}
												</v-list-item-title>
												<v-list-item-subtitle>
													&#8377;  {{product.price}} X {{quantity(product)}}
												</v-list-item-subtitle>
											</v-list-item-content>
										</v-list-item>
									</v-list>
									<div class="text-h6 pa-3 text-right">
										<p class="text-caption">Delivery Charge: <span class="red--text">May be applicable</span></p>
										Total Amount: {{amount(order.items)}}
									</div>
								</v-col>
								<v-col cols="12" lg="6">
									<v-timeline dense align-top>
										<v-timeline-item color="grey" small v-for="(history, index) in order.history" :key="index" >
											<small>{{new Date(history.createdAt).toLocaleDateString('en-GB') }} {{new Date(history.createdAt).toLocaleTimeString('en-GB') }}</small>
											<v-spacer></v-spacer>
											{{history.name}}
										</v-timeline-item>
									</v-timeline>
								</v-col>
							</v-row>
						</v-container>
					</v-card-text>
				</v-card>
			</template>
		</v-col>
		<v-col cols="0" sm="4">
			<v-card class="pa-3" flat>
				<v-card-title>Important Information</v-card-title>
				<v-alert border="left" color="indigo" icon="mdi-package" dark prominent>
					<h2>Delivery</h2>
					<p>
						To ensure your safety, the Delivery Agent will drop the package at
						your doorstep, ring the doorbell and then move back 2 meters while
						waiting for you to collect your package. If you are in a
						containment, the agent will call you and request you to collect your
						package from the nearest accessible point while following the same
						No-Contact delivery process.
					</p>
				</v-alert>
				<v-alert
					border="left"
					color="#C51162"
					icon="mdi-currency-inr"
					dark
					prominent
				>
					<h2>Payment</h2>
					<p>
						Please verify the contents of the package before making payment.
						Items are not returnable.
					</p>
				</v-alert>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
// import OrderItem from "@/components/product/CartItem";
import ProductImage from '@/components/product/Image'

export default {
	async created() {
		await this.$store.dispatch("myOrders");
	},
	data() {
		return {};
	},
	computed: {
		orders() {
			return this.$store.getters.orders;
		},
	},
	components: {
		// OrderItems,
		ProductImage
	},
	methods: {
		amount(items) {
			return items.reduce(function (accumulator, item) {
				return accumulator + item.price * item.quantity;
			}, 0);
		},
		quantity(item) {
			if(item.unit.toLowerCase()=='kg' && item.quantity < 1)
				return item.quantity*1000 +' g'
			if(item.unit.toLowerCase()=='kg')
				return item.quantity +' Kg'
			return item.quantity
		}
	},
};
</script>