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
		<v-card v-for="order in orders" :key="order.id"
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
	</div>
</template>

<script>
import User from '@/components/user/OrderProfile'
import ProductImage from '@/components/product/Image.vue'

export default {
	name: 'order-items',
	props: ['showAddress'],
	data() {
		return {
			dialog: false
		}
	},
	computed: {
		orders() {
			return this.$store.getters.orders
		}
	},
	methods: {
		goto(order) {
			this.$router.push('/order/'+order.id)
		},
		getDate(createdAt) {
			let date = new Date(createdAt)
			return date.getDate()+'-'+date.getMonth()+'-'+date.getFullYear()
		}
	},
	components: {
		User,
		ProductImage
	}
}
</script>