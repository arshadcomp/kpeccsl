<template>
	<div>
	<v-app-bar
		app
		color="primary"
		dark
    hide-on-scroll
	>
      <!-- :hide-on-scroll="$vuetify.breakpoint.mdAndUp" -->
		<v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
		<div class="d-flex align-center">
			<v-img
				alt="Vuetify Logo"
				class="shrink mr-2"
				contain
				src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
				transition="scale-transition"
				width="40"
			/>

			<v-img
				alt="Vuetify Name"
				class="shrink mt-1 hidden-sm-and-down"
				contain
				min-width="100"
				src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
				width="100"
        :to="'/home'"
			/>
		</div>

		<v-spacer></v-spacer>

		<v-menu
      top
      :close-on-click="closeOnClick"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Dropdown
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

		<!-- <v-btn
			href="https://github.com/vuetifyjs/vuetify/releases/latest"
			target="_blank"
			text
		>
			<span class="mr-2">Latest Release</span>
			<v-icon>mdi-open-in-new</v-icon>
		</v-btn> -->
	</v-app-bar>
	<v-navigation-drawer
			app
      v-model="drawer"
      temporary
    >
      <v-list
        nav
        shaped
      >
        <v-list-item-group
          v-model="group"
          active-class="primary--text text--accent-4"
        >
					<v-list-item v-for="(item, i) in navItems" :key="i" :to="item.link" link>
						<v-list-item-icon>
							<v-icon>{{item.icon}}</v-icon>
						</v-list-item-icon>
						<v-list-item-title>{{item.title}}</v-list-item-title>
					</v-list-item>

          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
					<v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-login</v-icon>
            </v-list-item-icon>
            <v-list-item-title :to="'/login'">Login</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Bar</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Fizz</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Buzz</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
		</div>
</template>

<script>
  export default {
		name: 'Menu',
    data: () => ({
      drawer: false,
			group: null,
			items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
			closeOnClick: true,
			navItems: [
				{
					icon: 'mdi-home',
					title: 'Home',
					link: '/'
				},
				{
					icon: 'mdi-login',
					title: 'Login',
					link: '/login'
				}
			]
    }),

    watch: {
      group () {
        this.drawer = false
      },
    },
  }
</script>