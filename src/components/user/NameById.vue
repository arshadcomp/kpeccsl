<template>
	<span>
		{{ username }}
	</span>
</template>

<script>
export default {
	name: 'user-name',
	props: {
		name: {
			type: String
		},
		userID: {
			type: String
		}
	},
	computed: {
		username() {
			return this.$store.getters.name(this.userID)
		},
		address() {
			return this.$store.getters.address(this.userID)
		},
		phone_number() {
			return this.$store.getters.phone(this.userID)
		}
	}
}
</script>