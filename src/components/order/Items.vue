<template>
	<div v-if="$vuetify.breakpoint.mobile">
		<v-list three-line>
			<v-list-item-group v-for="order in orders" :key="order.id">
				<v-list-item v-for="item in order.items" :key="item.id" :to="'/order/'+order.id">
					<v-list-item-avatar
						rounded
					>
					<v-img :src="item.image"></v-img>
					</v-list-item-avatar>
					<v-list-item-content>
						<!-- <v-list-item-title v-html="order.status" class="error--text"></v-list-item-title> -->
						<v-list-item-subtitle>
							<v-chip
								small
								outlined
								class="mb-2"
								:color="order.status=='PENDING' ? 'red' : 'green'"
								:text-color="order.status=='PENDING' ? 'red' : 'green'"
							>
								{{order.status}}
							</v-chip>
						</v-list-item-subtitle>
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
	</div>
	<div v-else>
		<div v-if="orders && admin" class="mb-6">
			<h5>Order Summary</h5>
			<v-data-table
				:headers="headers"
				:items="orders"
				:items-per-page="100"
				class="elevation-1"
			>
			<template v-slot:[`item.index`]="{ item }">
				{{ orders.map(function(x) {return x.id; }).indexOf(item.id) + 1 }}
			</template>
			<template v-slot:[`item.owner`]="{ item }">
				{{ $store.getters.name(item.owner) }}
			</template>
			<template v-slot:[`item.address`]="{ item }">
				{{ $store.getters.address(item.owner) }}
			</template>
			<template v-slot:[`item.phone`]="{ item }">
				{{ $store.getters.phone(item.owner) }}
			</template>
			<template v-slot:[`item.items`]="{ item }">
					{{ item.items.reduce((total, item) => { return total + item.price*item.quantity}, 0).toFixed(2) }}
			</template>
			</v-data-table>
		</div>
		<v-row v-if="orders && admin">
			<v-col v-for="order in orders" :key="order.id">
				<Item :order="order" :admin="admin" :showAddress="showAddress"/>
			</v-col>
		</v-row>
		<v-row v-if="orders && !admin">
			<v-col v-for="order in orders" :key="order.id" cols="12">
				<Item :order="order" :admin="admin" :showAddress="showAddress"/>
			</v-col>
			<v-col class="pa-6" v-if="nextToken" cols="12">
				<v-btn
					@click="loadMore"
				>
					Load More
				</v-btn>
			</v-col>
		</v-row>
		<v-row v-if="admin">
			<v-col class="pa-6" v-if="nextToken">
				<v-btn
					@click="loadMore"
				>
					Load More
				</v-btn>
			</v-col>
			<v-col class="pa-6" v-else>
				<PrintOrderList />
			</v-col>
		</v-row>
	</div>
</template>

<script>
// import User from '@/components/user/OrderProfile'
// import UserName from '@/components/user/NameById'
// import ProductImage from '@/components/product/Image.vue'
import Item from '@/components/order/Item'
import PrintOrderList from '@/components/order/Print'

export default {
	name: 'order-items',
	props: ['showAddress', 'admin', 'status'],
	data() {
		return {
			dialog: false,
			headers: [
				{
					text: 'Sr No',
					value: 'index',
				},
				{
					text: 'Name',
					align: 'start',
					sortable: false,
					value: 'owner',
				},
				{ text: 'Address', value: 'address' },
				{ text: 'Phone No', value: 'phone' },
				{ text: 'Items', value: 'items.length' },
				{ text: 'Amount', value: 'items' },
				{ text: 'Cash', value: '' },
			]
		}
	},
	computed: {
		orders() {
			return this.$store.getters.orders
		},
		nextToken() {
			return this.$store.getters.nextToken
		}
	},
	methods: {
		goto(order) {
			this.$router.push('/order/'+order.id)
		},
		// getDate(createdAt) {
		// 	let date = new Date(createdAt)
		// 	return date.getDate()+'-'+date.getMonth()+'-'+date.getFullYear()
		// }
		loadMore() {
			console.log('Load More Items')
			console.log('NEXT TOKEN', this.nextToken)
			console.log('NEXT TOKEN', this.status)
			this.$store.dispatch('ordersByStatus', { status: this.status, nextToken: this.nextToken })
		},
		total(items) {
			return items.reduce((total, item) => { return total + item.price*item.quantity}, 0)
		}
	},
	components: {
		// User,
		// UserName,
		// ProductImage,
		Item,
		PrintOrderList
	}
}
</script>