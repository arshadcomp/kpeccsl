<template>
	<v-card flat class="ma-n3 ma-md-0">
		<v-subheader class="text-uppercase">ORDER ID# {{order.id.substring(0,8)}}</v-subheader>
		<v-chip
			class="ma-2"
			:color="order.status=='PENDING' ? 'red' : 'green'"
			text-color="white"
		>
			{{order.status}}
		</v-chip>
		<v-card-text class="pt-0">
			<User :userID="order.owner" :showAddress="showAddress"/>
		</v-card-text>
		<v-list three-line>

		</v-list>
			<template v-for="(item, index) in order.items">
        <!-- <v-subheader
          v-if="item.name"
          :key="item.name"
          v-text="item.name"
        ></v-subheader>

        <v-divider
          v-else-if="!item.name"
          :key="index"
          :inset="item.inset"
        ></v-divider> -->
				

        <v-list-item
          :key="item.title"
        >
          <v-list-item-avatar>
						<ProductImage :imageUrl="item.image"/>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="item.name"></v-list-item-title>
            <v-list-item-subtitle>
							&#8377; {{item.price}} X {{item.quantity}} {{item.unit=='nos' ? '' : item.unit }}
						</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
				<v-divider :key="index"></v-divider>
      </template>
			<p class="text-right text-lg-h6 my-6 pr-4">
				Total: &#8377; {{ order.items.reduce((total, item) => { return total + item.price*item.quantity}, 0) }}
			</p>


	</v-card>
</template>

<script>
import User from '@/components/user/OrderProfile'
import ProductImage from '@/components/product/Image.vue'

export default {
	name: 'view-order',
	created() {
		if(this.$store.state.orders.findIndex(o => o.id === this.$route.params.id) < 0)
			this.$store.dispatch('getOrder', this.$route.params.id)
	},
	data() {
		return {
			showAddress : false
		}
	},
	computed: {
		loading() {
			return this.$store.state.showLoader
		},
		order() {
			return this.$store.getters.orderById(this.$route.params.id)
		}
	},
	components: {
		User,
		ProductImage
	}
}
</script>