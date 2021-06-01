<template>
	<v-card>
		<v-card-title>
			<v-select v-model="status" :items="statusList" label="Select Status" @change="update">
			</v-select>
		</v-card-title>
		<v-card-subtitle>
			<small>{{ item.id }}</small> 
			<v-spacer></v-spacer>
			DATE &amp; TIME: {{ new Date(item.createdAt).toLocaleDateString("en-GB") + ' '+new Date(item.createdAt).toLocaleTimeString("en-GB") }}
		</v-card-subtitle>
		<v-divider></v-divider>
		<v-card-title>
			{{ item.customer ? item.customer.name : "" }}
		</v-card-title>
		<v-card-subtitle>
			{{ item.customer ? item.customer.address : "" }}, Kaiga Township
			<v-spacer></v-spacer>
			Mobile: {{ item.customer ? item.customer.phone_number : "" }}
		</v-card-subtitle>
		<v-divider></v-divider>
		<v-card-text>
			<v-list dense>
				<v-list-item v-for="(product, index) in item.items" :key="index">
					<v-list-item-content>
						{{ product.name }}
					</v-list-item-content>
					<v-list-item-content>
						{{ product.quantity.toFixed(2) }} {{ product.unit }}
					</v-list-item-content>
					<v-list-item-content>
						X Rs. {{ product.price }}
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-card-text>
	</v-card>
</template>

<script>
export default {
	name: 'order-with-customer',
	props: {
		item : {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			status: JSON.parse(JSON.stringify(this.item.status)),
			statusList: ['PENDING','CONFIRMED', 'CANCELLED', 'PACKED', 'DELIVERED'],
		}
	},
	methods:{
		update() {
			const history = JSON.parse(JSON.stringify(this.item.history))
			history.push({name: this.status, createdAt: new Date().toISOString })
			console.log('UPDATE ITEM', history)
			this.$store.dispatch('updateOrder', {id: this.item.id, status:this.status, history: history })
		}
	}
}
</script>