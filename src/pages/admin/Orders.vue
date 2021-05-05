<template>
	<v-sheet>
		<h2>All Orders</h2>
		<OrderItems :showAddress="true" />
		<PrintOrderList />
	</v-sheet>
</template>

<script>
import OrderItems from '@/components/order/Items'
import PrintOrderList from '@/components/order/Print'

export default {
	name: 'all-orders',
	async created() {
		// this.$store.dispatch('confirmOrders')
		await this.$store.dispatch('ordersByStatus', 'CONFIRMED')
	},
	computed: {
		orders() {
			return this.$store.getters.orders
		}
	},
	components: {
		OrderItems,
		PrintOrderList
	}
}
</script>