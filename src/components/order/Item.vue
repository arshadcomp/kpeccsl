<template>
		<v-card
		v-if="admin"
			class="mb-3"
			outlined
		>
			<v-card-text class="pb-0">
				<small>ORDER ID# {{order.id }}</small> <br>
				<span class="font-weight-light text-uppercase">{{order.status}}</span><br>
				<v-sheet width="300">
					<v-select
						v-model="status"
						@change="updateStatus"
						:items="statusList"
						label="Update Status"
						outlined
						full-width
					></v-select>
				</v-sheet>
				Date: {{ getDate(order.createdAt) }}
				<User :userID="order.owner" :showAddress="showAddress"/>
				<v-list v-if="order.items">
					<v-list-item v-for="item in order.items" :key="item.id">
						<v-list-item-content>
							<v-list-item-title v-html="item.name"></v-list-item-title>
							<v-list-item-subtitle>
								&#8377; {{item.price}} X {{item.quantity}} {{item.unit=='nos' ? '' : item.unit }}
							</v-list-item-subtitle>
						</v-list-item-content>
						<v-list-item-avatar tile size="64">
							&#8377; {{item.price*item.quantity}}
						</v-list-item-avatar>
					</v-list-item>
					<v-list-item>
						<v-list-item-content>
							<v-list-item-title class="text-right">
								Total Amount
							</v-list-item-title>
						</v-list-item-content>
						<v-list-item-avatar tile size="64">
							<v-list-item-title>
								&#8377; {{ order.items.reduce((total, item) => { return total + item.price*item.quantity}, 0) }}
							</v-list-item-title>
						</v-list-item-avatar>
					</v-list-item>
				</v-list>
			</v-card-text>
		</v-card>
		<v-card
			v-else
			class="mb-3"
			outlined
		>
			<v-card-text class="d-flex justify-space-between pb-0">
				<span class="font-weight-light text-uppercase">ORDER ID# {{order.id.substring(0,8)}}</span>
				<v-chip
					class="ma-2"
					:color="order.status=='PENDING' ? 'red' : 'green'"
					text-color="white"
				>
					{{order.status}}
				</v-chip>
			</v-card-text>
			<v-card-text class="pt-0">
				Date: {{ getDate(order.createdAt) }}
				<User :userID="order.owner" :showAddress="showAddress"/>
			</v-card-text>
			
			
			<v-list-item three-line v-for="item in order.items" :key="item.id" @click="goto(order)">
				<v-list-item-avatar
					size="80"
					color="grey"
					rounded
				>
					<ProductImage :imageUrl="item.image"/>
				</v-list-item-avatar>

				<v-list-item-content>
					<v-list-item-title class="headline mb-1">
						{{item.name}}
					</v-list-item-title>
					<v-list-item-subtitle>
						&#8377; {{item.price}} X {{item.quantity}} {{item.unit=='nos' ? '' : item.unit }}
					</v-list-item-subtitle>
				</v-list-item-content>
				
				<v-list-item-action>
					<v-btn small color="primary" :to="'/product/'+item.id" outlined class="mb-3">
						<v-icon small>mdi-star</v-icon> REVIEW
					</v-btn>
					<small>FREE DELIVERY</small>
				</v-list-item-action>

			</v-list-item>
			<p class="text-right text-lg-h6 pr-4">
				Total: &#8377; {{ order.items.reduce((total, item) => { return total + item.price*item.quantity}, 0) }}
			</p>
		</v-card>
</template>

<script>
import User from '@/components/user/OrderProfile'
import ProductImage from '@/components/product/Image.vue'

export default {
	name: 'order-item',
	props: ['order', 'admin', 'showAddress'],
	data() {
		return {
			status: '',
			history: [],
			statusList: ['PENDING', 'CANCELLED', 'REJECTED', 'CONFIRMED','PACKED', 'DELIVERED'],
		}
	},
	components: {
		User,
		ProductImage,
	},
	methods: {
		goto(order) {
			this.$router.push('/order/'+order.id)
		},
		getDate(createdAt) {
			let date = new Date(createdAt)
			return date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear()+' '+date.getHours()+':'+date.getMinutes()
		},
		updateStatus() {
			this.history = JSON.parse(JSON.stringify(this.order.history))
			this.history.push({name: this.status, createdAt: new Date().toISOString()})
			console.log('UPDATE ORDER STATUS',this.status ,this.history)
			this.$store.dispatch('updateOrder', {id: this.order.id, status: this.status, history: this.history })
		},
	},
}
</script>