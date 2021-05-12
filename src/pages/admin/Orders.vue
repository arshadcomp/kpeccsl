<template>
	<v-sheet>
		<div class="d-flex justify-space-between">
			<h2>All Orders</h2>
			<v-sheet width="300">
				<v-select
					v-model="status"
					@change="updateStatus"
					:items="statusList"
					label="Select Status"
					outlined
					full-width
				></v-select>
			</v-sheet>
		</div>
		
		<OrderItems :showAddress="true" :admin="true" :status="status" />
		<!-- <PrintOrderList /> -->
	</v-sheet>
</template>

<script>
import OrderItems from '@/components/order/Items'
// import PrintOrderList from '@/components/order/Print'

export default {
	name: 'all-orders',
	async created() {
		await this.$store.dispatch('ordersByStatus', { status: 'CONFIRMED', nextToken: null })
	},
	data() {
		return {
			status: 'CONFIRMED',
			statusList: ['PENDING','CONFIRMED','PACKED'],
		}
	},
	computed: {
		orders() {
			return this.$store.getters.orders
		}
	},
	components: {
		OrderItems,
		// PrintOrderList
	},
	methods: {
		updateStatus() {
			this.$store.dispatch('emptyOrders')
			console.log('UPDATE ORDER STATUS', this.status)
			this.$store.dispatch('ordersByStatus', { status: this.status, nextToken: null })
		},
	}
}
</script>