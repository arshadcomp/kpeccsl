<template>
	<v-card class="mb-3" width="340">
		<v-card-text>		
			<p>
				<small>ORDER ID# {{order.id }}</small> <br>
				Date &amp; Time: {{ getDate(order.createdAt) }}
			</p>
			<v-sheet width="300">
				<v-select
					v-model="order.status"
					@change="updateStatus"
					:items="statusList"
					label="Select Status"
					outlined
					full-width
				></v-select>
			</v-sheet>
			<User v-if="order.owner" :userID="order.owner" :showAddress="true"/>
			<v-list v-if="order.items">
				<v-list-item v-for="item in order.items" :key="item.id">
					<v-list-item-content>
						<v-list-item-title v-html="item.name"></v-list-item-title>
						<v-list-item-subtitle>
							&#8377; {{item.price}} X {{item.quantity}} {{item.unit=='nos' ? '' : item.unit }}
						</v-list-item-subtitle>
					</v-list-item-content>
					<v-list-item-avatar>
						&#8377; {{item.price*item.quantity}}
					</v-list-item-avatar>
				</v-list-item>
				<v-list-item>
					<v-list-item-content>
						<v-list-item-title>
							Total Amount
						</v-list-item-title>
					</v-list-item-content>
					<v-list-item-avatar>
						<v-list-item-title>
							&#8377; {{ order.items.reduce((total, item) => { return total + item.price*item.quantity}, 0) }}
						</v-list-item-title>
					</v-list-item-avatar>
				</v-list-item>
			</v-list>
		</v-card-text>

		<!-- <v-card-text v-if="admin && order.items">
			<v-list-item v-for="item in order.items" :key="item.id">
				<v-list-item-content>
					<v-list-item-title v-html="item.name"></v-list-item-title>
					<v-list-item-subtitle>
						&#8377; {{item.price}} X {{item.quantity}} {{item.unit=='nos' ? '' : item.unit }}
					</v-list-item-subtitle>
				</v-list-item-content>
				<v-list-item-avatar>
					{{item.price*item.quantity}}
				</v-list-item-avatar>
			</v-list-item>

		</v-card-text> -->
		
		<!-- <v-card-text v-if="!admin && order.items">
			<v-list-item three-line v-for="item in order.items" :key="item.id" @click="goto(order)">
				<v-list-item-avatar
					size="80"
					color="grey"
					rounded
				>
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
		</v-card-text> -->
	</v-card>
</template>

<script>
import User from '@/components/user/OrderProfile'

export default {
	name: 'admin-order-item',
	props: ['id', 'admin'],
	data() {
		return {
			order: {},
			statusList: ['PENDING','CONFIRMED','PACKED'],
		}
	},
	async mounted() {
		this.order = await this.$store.dispatch('getOrder', this.id)
	},
	// async created() {
	// 	this.order = await this.$store.dispatch('getOrder', this.id)
	// },
	// computed: {
	// 	order() {
	// 		return this.$store.dispatch('getOrder', this.id)
	// 	}
	// },
	methods: {
		updateStatus() {
			console.log('UPDATE ORDER STATUS', this.order.status)
		},
		goto(order) {
			this.$router.push('/order/'+order.id)
		},
		getDate(createdAt) {
			let date = new Date(createdAt)
			return date.getDate()+'-'+date.getMonth()+'-'+date.getFullYear()+' '+date.getHours()+':'+date.getMinutes()
		}
	},
	components: {
		User
	}
}
</script>