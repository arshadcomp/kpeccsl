<template>
	<v-sheet>
		<Name v-if="user" :name="name"/>
		<Address v-if="user && showAddress" :address="address" :area="area" />
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
		if(this.$store.getters.userById(this.userID) === undefined)
			this.$store.dispatch('getUser', this.userID)
	},
	props: ['userID', 'showAddress'],
	computed: {
		user() {
			return this.$store.getters.userById(this.userID)
		},
		name() {
			return this.$store.getters.name(this.userID)
		},
		address() {
			return this.$store.getters.address(this.userID)
		},
		area() {
			return this.$store.getters.area(this.userID)
		},
		phone_number() {
			return this.$store.getters.phone(this.userID)
		}
	},
	components: {
		Name,
		Address,
		Phone
	},
}
</script>