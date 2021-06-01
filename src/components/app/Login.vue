<template>
	<div>
		<amplify-authenticator username-alias="email">
			<amplify-sign-up
				slot="sign-up"
				username-alias="email"
				:form-fields.prop="formFields"
			></amplify-sign-up>
			<amplify-sign-in slot="sign-in" username-alias="email"></amplify-sign-in>
		</amplify-authenticator>
	</div>
</template>

<style>
:root {
	--amplify-primary-color: #1565c0;
}
</style>

<script>
export default {
	name: "login",
	data() {
		return {
			formFields: [
				{
					type: "phone_number",
					label: "Mobile No",
					dialCode: "+91",
					placeholder: "Mobile No",
					required: true,
				},
				{
					type: "email",
					required: true,
				},
				{
					type: "password",
					label: "Password",
					placeholder: "Password",
					required: true,
				},
				{
					type: "name",
					label: "Full Name",
					placeholder: "Full Name",
					required: true,
				},
				{
					type: "address",
					label: "Quarter No. (Kaiga Township)",
					placeholder: "Quarter No.",
					required: true,
				},
			],
			signInFields: [
				{
					type: "email",
					required: true,
				},
				{
					type: "password",
					required: true,
				},
			],
		};
	},
};
</script>