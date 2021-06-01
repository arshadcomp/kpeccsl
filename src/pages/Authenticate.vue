<template>
	<div v-if="!isAuthorized">
		<Login />
	</div>
	<div v-else>
		<Logout />
	</div>
</template>

<script>
import Login from '@/components/app/Login'
import Logout from '@/components/app/Logout'

export default {
	name: "login",
	mounted() {
		// this.updateNavigator();
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