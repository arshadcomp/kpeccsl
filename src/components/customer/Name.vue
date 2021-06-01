<template>
	<span>{{name}}</span>
</template>

<script>
export default {
	async created() {
		if(this.$store.getters.customerById(this.id) === undefined)
			await this.$store.dispatch('getCustomer', this.id)
	},
	props: {
		id:{
			type: String,
			required: true
		}
	},
	computed: {
		name() {
			return this.$store.getters.customerName(this.id)
		}
	}
}
</script>