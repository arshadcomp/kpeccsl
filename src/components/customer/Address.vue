<template>
	<span>{{address}}</span>
</template>

<script>
export default {
	// async created() {
	// 	if(this.$store.getters.customerById(this.id) === undefined)
	// 		await this.$store.dispatch('getCustomer', this.id)
	// },
	props: {
		id:{
			type: String,
			required: true
		}
	},
	computed: {
		address() {
			return this.$store.getters.customerAddress(this.id)
		}
	}
}
</script>