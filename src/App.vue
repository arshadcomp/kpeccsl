<template>
  <v-app>
    <NavigationDrawer/>
    <AppBar/>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>
import AppBar from '@/components/AppBar';
import NavigationDrawer from '@/components/NavigationDrawer';
import Footer from '@/components/Footer';

import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components'

export default {
  name: 'App',
  async created() {
    await this.$store.dispatch('authenticate')

    onAuthUIStateChange((authState, authData) => {
      console.log("AUTH CHANGED")
      this.$store.commit('SET_AUTH', { authState, authData })
      // if(authData && authData.attributes['custom:seller_id']) {
      //   // this.$store.commit('SET_SELLER', authData.username)
      //   // this.$store.commit('SET_SELLER_BY_ID', parseInt(authData.attributes['custom:seller_id']))
      // }

      if(authState === AuthState.SignedIn && this.$route.path === '/authenticate' )
        this.$router.push('/')
      if(authState === AuthState.SignedOut && this.$route.path === '/authenticate' )
        this.$router.push('/')
    })
  },
  beforeDestroy() {
    return onAuthUIStateChange;
  },
  components: {
    AppBar,
    NavigationDrawer,
    Footer
  }
};
</script>