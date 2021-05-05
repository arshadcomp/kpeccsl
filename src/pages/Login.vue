<template>
  <v-row>
    <v-col class="pt-0 pt-md-16">
      <v-card
        class="mx-auto mx-n6 mx-md-auto mt-6 mt-md-16"
        max-width="460"
      >
      <v-card-title>Your Attention Please</v-card-title>
        <v-card-text>
          <v-alert
            dense
            outlined
            type="error"
          >
            <h3>Create Account</h3>
            If you are using our website for the first time, kindly first <strong>Create Account</strong> using the link below before signing in.
          </v-alert>
          <v-alert
            color="#2A3B4D"
            dark
            icon="mdi-email"
            dense
          >
            <h3>Email ID</h3>
            Please use the email id which is at your disposal right now. If possible do not use NPCIL email id.
          </v-alert>
          <v-alert
            color="#C51162"
            dark
            icon="mdi-emoticon"
            dense
          >
            <h3>No worries!</h3>
            If you fail to recieve OTP on your email, or have trouble logging in, please do not panic. Send a WhatsApp message with your email ID, to <strong>+91-8277749766</strong> and we will take care of the rest.
          </v-alert>

        </v-card-text>
      </v-card>
    </v-col>
    <v-col>
      <amplify-authenticator username-alias="email">
      <amplify-sign-up
        slot="sign-up"
        username-alias="email"
        :form-fields.prop="formFields"
      ></amplify-sign-up>
      <amplify-sign-in slot="sign-in" username-alias="email"></amplify-sign-in>
    </amplify-authenticator>
    </v-col>
  </v-row>
</template>

<style>
	:root {
    --amplify-primary-color: #1565C0;
  }
</style>

<script>
export default {
  name: 'login',
  data() {
    return {
      formFields: [
        {
          type: 'phone_number',
          label: 'Mobile No',
          dialCode: '+91',
          placeholder: 'Mobile No',
          required: true,
        },
        {
          type: 'email',
          required: true,
        },
        {
          type: 'password',
          label: 'Password',
          placeholder: 'Password',
          required: true,
        },
        {
          type: 'name',
          label: 'Full Name',
          placeholder: 'Full Name',
          required: true,
        },
        {
          type: 'address',
          label: 'Quarter No. (Kaiga Township)',
          placeholder: 'Quarter No.',
          required: true,
        },
      ],
      signInFields: [
        {
          type: 'phone_number',
          label: 'Mobile No',
          dialCode: '+91',
          placeholder: 'Mobile No',
          required: true,
        },
        {
          type: 'password',
          required: true,
        }
      ]
    }
  }
}
</script>