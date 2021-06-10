<template>
	<v-sheet class="mb-6">
		<v-list
			subheader
			two-line
		>
			<v-list-item>
				<v-list-item-avatar>
          <v-avatar
						color="grey"
					>
						<span class="white--text headline">1</span>
					</v-avatar>
        </v-list-item-avatar>
				<v-list-item-content>
					<v-list-item-title>
						LOGIN
					</v-list-item-title>
					<v-list-item-subtitle><strong>{{user.name}}</strong> <span>{{user.email}}</span></v-list-item-subtitle>
				</v-list-item-content>
				<v-list-item-action>
          <v-btn icon>
            <v-icon color="green lighten-1">mdi-check-circle</v-icon>
          </v-btn>
        </v-list-item-action>
			</v-list-item>
			<v-divider></v-divider>
			<v-list-item>
				<v-list-item-avatar>
          <v-avatar
						color="grey"
					>
						<span class="white--text headline">2</span>
					</v-avatar>
        </v-list-item-avatar>
				<v-list-item-content>
					<v-list-item-title>
						DELIVERY ADDRESS
					</v-list-item-title>
					<v-list-item-subtitle>
						<Address :address="user.address" :multiline="true" class="mb-2" />
						<Phone :phone_number="user.phone_number"/>
					</v-list-item-subtitle>
				</v-list-item-content>
				<v-list-item-action>
          <v-btn small color="primary" :to="'/profile'" outlined>
            UPDATE
          </v-btn>
        </v-list-item-action>
			</v-list-item>
			<v-divider></v-divider>

			<v-list-item>
				<v-list-item-avatar>
          <v-avatar
						color="grey"
					>
						<span class="white--text headline">3</span>
					</v-avatar>
        </v-list-item-avatar>
				<v-list-item-content>
					<v-list-item-title>
						ORDER SUMMARY
					</v-list-item-title>
					<v-list-item-subtitle>
						{{cart.length}} Items
					</v-list-item-subtitle>
				</v-list-item-content>
				<v-list-item-action>
          <v-btn small color="primary" :to="'/cart'" outlined>
            CHANGE
          </v-btn>
        </v-list-item-action>
			</v-list-item>
		</v-list>
	</v-sheet>
</template>

<script>
import Address from '@/components/user/Address'
import Phone from '@/components/user/Phone'

export default {
	name: 'Checkout',
	data() {
		return {
			cart: this.$store.getters.cart,
			user: this.$store.state.user.attributes,
			dialog: false
		}
	},
	components: {
		Address,
		Phone
	}
}
</script>