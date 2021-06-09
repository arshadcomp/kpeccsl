<template>
    <v-sheet class="text-center mb-6">
			<v-skeleton-loader
				v-if="this.loading" 
				:loading="this.loading" 
				transition="fade-transition"
				class="mx-auto"
				type="card"
			></v-skeleton-loader>

			<v-card flat v-else-if="!this.loading && !order" >
				<v-img><v-icon size="120">mdi-alpha-x-box</v-icon></v-img>
				<v-card-title class="error--text">Sorry! Your order could not be confirmed due to some issue. Please try after some time. </v-card-title>
			</v-card>

			<v-card flat v-else-if="!this.loading && order" >
				<v-img><v-icon size="120">mdi-truck-delivery</v-icon></v-img>
				<v-card-title class="success--text">Congratulations! Your order is confirmed. Expect delivery in 1-2 day. </v-card-title>
			</v-card>
    </v-sheet>
</template>

<script>
export default {
	name: 'order-confirm',
	computed: {
		loading() {
			return this.$store.getters.loader
		},
		order() {
			return this.$store.getters.order
		}
	},
	data() {
		return {
			time: Math.floor((new Date()).getTime()/1000)
		}
	},
	components: {

	}
}
</script>