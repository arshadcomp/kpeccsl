<template>
  <v-app>
    <NavigationDrawer/>
    <!-- <v-navigation-drawer app>
    </v-navigation-drawer>

    <v-app-bar app>
    </v-app-bar> -->
    <!-- <Menu/> -->
    <AppBar ref="drawer"/>

    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
    <Footer/>
    <!-- <v-footer app>
    </v-footer> -->
  </v-app>
</template>

<script>
// import Menu from '@/components/Menu';
import Footer from '@/components/Footer';
import NavigationDrawer from '@/components/NavigationDrawer';
import AppBar from '@/components/AppBar';

import { Auth } from 'aws-amplify'
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components'

import { API } from 'aws-amplify';
import { onUpdateProduct } from '@/graphql/subscriptions';

export default {
  name: 'App',
  created() {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        // console.log('USER', user)
        this.$store.commit('SET_AUTH_STATE', 'signedin')
        this.$store.commit('SET_AUTH_DATA', {attributes: user.attributes, signInUserSession: user.signInUserSession})
      }).catch(err => {
        console.log(err)
        this.$store.commit('SET_AUTH_STATE', 'signedout')
        this.$store.commit('SET_AUTH_DATA', null)
      })

    onAuthUIStateChange((authState, authData) => {
      console.log('AUTH STATE', authState)
      if(authState === AuthState.SignedIn) {// 'signedin') {
        this.$store.commit('SET_AUTH_STATE', authState)
        this.$store.commit('SET_AUTH_DATA', authData)
      } else {
        this.$store.commit('SET_AUTH_STATE', 'signedout')
        this.$store.commit('SET_AUTH_DATA', null)
      }
      if(authState === 'signedin' && this.$route.path === '/login' )
        this.$router.push('/')
      if(authState === 'signedout' && this.$route.path === '/logout' )
        this.$router.push('/')
    })
  },
  beforeDestroy() {
    return onAuthUIStateChange;
  },
  components: {
    // Menu,
    NavigationDrawer,
    AppBar,
    Footer
  },
  subscribe() {
    this.subscription = API.graphql({ query: onUpdateProduct })
      .subscribe({
        next: (eventData) => {
          console.log('Product updated', eventData)
          // let productId = eventData.value.data.onUpdateProduct.id
        }
      });
  },
  unsubscribe() {
    this.subscription.unsubscribe();
  },
  data: () => ({
    //
  }),
};
</script>