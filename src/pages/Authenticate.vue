<template>
	<div v-if="isAuthorized">
		<Logout />
	</div>
	<div v-else>
		<Login />
	</div>
</template>

<script>
import Login from '@/components/Login'
import Logout from '@/components/Logout'

export default {
	name: "login",
	mounted() {
		console.log('AUTHENTICATE')
	},
	computed: {
		isAuthorized() {
			return this.$store.getters.isAuthorized;
		}
	},
	methods: {
	},
	components: {
		Login,
		Logout
	}
};
</script>