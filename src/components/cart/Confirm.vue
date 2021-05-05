<template>
	<v-sheet class="mb-6">
		<v-list
			subheader
			two-line
		>
			<v-list-item>
				<v-list-item-avatar>
          <v-icon
            class="grey lighten-1"
            dark
          >
            mdi-currency-inr
          </v-icon>
        </v-list-item-avatar>
				<v-list-item-content>
					<v-list-item-title>
						PAYMENT OPTIONS
					</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
			<v-divider></v-divider>
			<v-list-item>
				<v-list-item-avatar>
          <v-avatar>
						<span class="green--text"><v-icon>mdi-checkbox-blank-circle-outline</v-icon></span>
					</v-avatar>
        </v-list-item-avatar>
				<v-list-item-content>
					<v-list-item-title>
						Cash on Delivery
					</v-list-item-title>
					<v-list-item-subtitle>
						Pay in Cash
					</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>
			<v-divider inset></v-divider>
			<v-list-item>
				<v-list-item-avatar>
          <v-avatar>
						<span class="green--text"><v-icon>mdi-check-circle</v-icon></span>
					</v-avatar>
        </v-list-item-avatar>
				<v-list-item-content>
					<v-list-item-title>
						Card swipe on Delivery
					</v-list-item-title>
					<v-list-item-subtitle>
						Either you can pay via card or transfer it to the UPI address at the time of delivery
					</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>
			<v-divider inset></v-divider>
			<v-list-item>
				<v-list-item-avatar>
          <v-avatar>
						<span class="green--text"><v-icon>mdi-checkbox-blank-circle-outline</v-icon></span>
					</v-avatar>
        </v-list-item-avatar>
				<v-list-item-content>
					<v-list-item-title>
						Other Options
					</v-list-item-title>
					<v-list-item-subtitle>
						Coming Soon
					</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>
		</v-list>
	</v-sheet>
</template>

<script>
export default {
	name: 'Confirm',
	data() {
		return {
			// cart: this.$store.getters.cart,
			// user: this.$store.state.user.attributes
		}
	},
	components: {
	}
}
</script>