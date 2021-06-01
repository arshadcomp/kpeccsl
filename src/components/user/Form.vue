<template>
  <v-card
    max-width="375"
    class="mx-auto pa-3"
  >
		<h3>UPDATE PROFILE</h3>
		<v-form
			ref="form"
			v-model="valid"
			lazy-validation
		>
			
			<v-text-field
				v-model="user.name"
				:counter="40"
				:rules="nameRules"
				label="Name"
				required
			></v-text-field>

			<v-text-field
				v-model="user['custom:employee_no']"
				:counter="10"
				label="Employee No"
			></v-text-field>

			<v-text-field
				v-model="user.address"
				:counter="10"
				:rules="addressRules"
				label="Quarter No."
				required
			></v-text-field>

			<v-select
				v-model="user['custom:area']"
				:items="items"
				:rules="[v => !!v || 'Area is required']"
				label="Area"
			></v-select>

			<v-text-field
				v-if="canBelongToSeller"
				v-model="user['custom:seller_id']"
				:counter="10"
				label="Seller ID"
			></v-text-field>

			<!-- <v-checkbox
				v-model="checkbox"
				:rules="[v => !!v || 'You must agree to continue!']"
				label="Do you agree?"
				required
			></v-checkbox> -->

			<v-btn
				:disabled="!valid"
				color="success"
				class="mr-4"
				@click="validate"
			>
				Submit
			</v-btn>
			<v-btn
				color="error"
				class="mr-4"
				@click="edit"
			>
				Cancel
			</v-btn>
		</v-form>
  </v-card>
</template>

<script>
  export default {
		name:'profile-form',
		props: ['user'],
		created() {
			console.log('ORIGINAL USER', this.user)
		},
		data: () => ({
      valid: false,
      // name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 40) || 'Name must be less than 10 characters',
			],
			// employeeRules: [
      //   v => !!v || 'Employee No is required',
      //   v => (v && v.length <= 40) || 'Employee Number must be less than 10 characters',
			// ],
			addressRules: [
        v => !!v || 'Address is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      select: null,
      items: [
        'Phase-I Jaffna Area',
        'Phase-I Temple Area',
				'Phase-I D+ Type Area',
				'Phase-I Hospital Area',
				'Phase-I E Type Area',
				'Phase-II',
				'Phase-II C-7&8 Area',
      ],
      checkbox: false,
		}),
		computed: {
			canBelongToSeller() {
				const allowedRoles = ['Root','Admin','Manager','Employee']
				return this.$store.state.user &&
					this.$store.state.user.signInUserSession &&
					this.$store.state.user.signInUserSession.accessToken &&
					this.$store.state.user.signInUserSession.accessToken.payload['cognito:groups'] &&
					this.$store.state.user.signInUserSession.accessToken.payload['cognito:groups'].some(role => allowedRoles.includes(role))
			}
		},
    methods: {
      validate () {
				this.$refs.form.validate()
				if(this.valid){
					console.log('USER AFTER CHANGE', this.user)
					this.$store.dispatch('updateUser', this.user)
					this.$emit('edit')
				}
			},
			edit() {
				this.$emit('edit')
			},
    },
  }
</script>