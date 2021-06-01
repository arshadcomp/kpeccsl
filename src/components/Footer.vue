<template>
  <v-footer
		color="indigo text--lighten-1"
    app
    inset
    absolute
    padless
  >
    <v-row
      justify="center"
      no-gutters
    >
      <v-col cols="12" md="3">
        <v-subheader class="white--text"><small>ABOUT</small></v-subheader>
        <v-list flat color="indigo text--lighten-1">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="white--text mb-2"><small>Contact Us</small></v-list-item-title>
              <v-list-item-title class="white--text mb-2"><small>About Us</small></v-list-item-title>
              <v-list-item-title class="white--text mb-2"><small>By Laws</small></v-list-item-title>
              <v-list-item-title class="white--text mb-2"><small>Committee</small></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col cols="12" md="3">
        <v-subheader class="white--text"><small>HELP</small></v-subheader>
        <v-list flat color="indigo text--lighten-1">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="white--text mb-2"><small>By Laws</small></v-list-item-title>
              <v-list-item-title class="white--text mb-2"><small>Payments</small></v-list-item-title>
              <v-list-item-title class="white--text mb-2"><small>Shipping</small></v-list-item-title>
              <v-list-item-title class="white--text mb-2"><small>Cancellation &amp; Returns</small></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col cols="12" md="3">
        <v-subheader class="white--text"><small>REGISTERED OFFICE</small></v-subheader>
        <v-list flat color="indigo text--lighten-1">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="white--text"><small>Kaiga Township, Mallapur</small></v-list-item-title>
              <v-list-item-title class="white--text"><small>Karwar, Uttara Kannada</small></v-list-item-title>
              <v-list-item-title class="white--text"><small>Karnataka</small></v-list-item-title>
              <v-list-item-title class="white--text"><small>PIN : 581400</small></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        
      </v-col>
      <v-col
        class="indigo lighten-1 py-4 text-center white--text"
        cols="12"
      >
        <small>Developed By: <a mailto="arshad.comp@gmail.com"></a>arshad.comp@gmail.com</small><br>
        <v-icon class="white--text">mdi-copyright</v-icon> 1991 - {{ new Date().getFullYear() }} — <strong v-if="company">{{company.name.full}}</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
  export default {
    computed: {
      company() {
        return this.$store.getters.company
      }
    },
    data: () => ({
      links: [
        'Home',
        'About Us',
        'Team',
        'Services',
        'Contact Us',
      ],
    }),
  }
</script>