<template>
  <v-footer
		color="secondary text--lighten-1"
    padless
  >
    <v-row
      justify="center"
      no-gutters
    >
      <v-col cols="12" md="3">
        <v-subheader class="white--text"><small>ABOUT</small></v-subheader>
        <v-list flat dense color="secondary text--lighten-1">
          <v-list-item v-for="(item, index) in aboutItems" :key="index" :to="item.to">
            <v-list-item-content>
              <v-list-item-title class="white--text mb-2">{{item.title}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col cols="12" md="3">
        <v-subheader class="white--text"><small>HELP</small></v-subheader>
          <v-list flat dense color="secondary text--lighten-1">
            <v-list-item v-for="(item, index) in helpItems" :key="index" :to="item.to">
              <v-list-item-content>
                <v-list-item-title class="white--text mb-2">{{item.title}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
        </v-list>
      </v-col>
      <v-col cols="12" md="3">
        <v-subheader class="white--text"><small>REGISTERED OFFICE</small></v-subheader>
        <v-list flat color="secondary text--lighten-1">
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
        class="secondary darken-2 py-4 text-center white--text"
        cols="12"
      >
        <small>Developed By: <a mailto="arshad.comp@gmail.com"></a>arshad.comp@gmail.com</small><br>
        <v-icon class="white--text">mdi-copyright</v-icon> <strong>1991 - {{ new Date().getFullYear() }} — {{$vuetify.breakpoint.mobile ? company.name.short : company.name.full}}</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
  export default {
    computed: {
      company() {
        return this.$store.getters.company;
      },
    },
    data: () => ({
      aboutItems: [
        {
          title: 'Home',
          to: '/'
        },
        {
          title: 'About Us',
          to: '/'
        },
        {
          title: 'Contact Us',
          to: '/'
        },
        {
          title: 'Credits',
          to: '/credits'
        }
      ],
      helpItems: [
        {
          title: 'Payments',
          to: '/'
        },
        {
          title: 'Shipping',
          to: '/'
        },
        {
          title: 'Cancellation',
          to: '/'
        },
        {
          title: 'Returns',
          to: '/'
        }
      ]
    }),
  }
</script>