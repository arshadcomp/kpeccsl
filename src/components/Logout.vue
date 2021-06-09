<template>
	<v-container>
			<v-row justify="space-around">
				<v-col
					cols="12"
				>
					<v-sheet
						class="pa-6"
					>
						<v-sheet
							:elevation="6"
							class="mx-auto pa-6"
							max-width="600"
						>
							<h2 class="mb-6">Logout</h2>
							<v-subheader class="pl-0 mb-6">Are you sure you want to logout. You will be signed out from this device only.</v-subheader>
							<v-card max-width="240">
								<amplify-sign-out></amplify-sign-out>
							</v-card>
						</v-sheet>
					</v-sheet>
				</v-col>
			</v-row>
		</v-container>
</template>

<script>
export default {
	name: 'logout',
}
</script>