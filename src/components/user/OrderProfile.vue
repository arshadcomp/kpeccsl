<template>
	<v-sheet>
		<div class="d-flex justify-space-between">
			<Name v-if="user" :name="name"/>
			<Address v-if="user && showAddress" :address="address" :phone_number="phone_number" />
		</div>
		<Phone v-if="user" :phone_number="phone_number"/>
	</v-sheet>
</template>

<script>
import Name from '@/components/user/Name'
import Address from '@/components/user/Address'
import Phone from '@/components/user/Phone'

export default {
	name: 'user',
	created() {
		// console.log("USER", this.$store.getters.userById(this.userID))
		if(this.$store.getters.userById(this.userID) === undefined)
			this.$store.dispatch('getUser', this.userID)
	},
	props: ['userID', 'showAddress'],
	computed: {
		user() {
			return this.$store.getters.userById(this.userID)
		},
		name() {
			return this.user ? this.user.UserAttributes.find(u => u.Name==='name').Value : ''
		},
		address() {
			return this.user ? this.user.UserAttributes.find(u => u.Name==='address').Value : ''
		},
		phone_number() {
			return this.user ? this.user.UserAttributes.find(u => u.Name==='phone_number').Value : ''
		}
	},
	components: {
		Name,
		Address,
		Phone
	},
}
</script>