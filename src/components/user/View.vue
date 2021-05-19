<template>
	<v-skeleton-loader
		v-if="loader"
		class="mx-auto"
		max-width="375"
		type="card"
	></v-skeleton-loader>
  <v-card
    v-else
		max-width="375"
    class="mx-auto"
  >
	<!-- src="https://source.unsplash.com/z_MlmEelJpE/640x480" -->
    <v-img
			src="https://picsum.photos/id/338/480/640"
      height="300px"
      dark
    >
      <v-row class="fill-height">
        <v-card-title>
          <v-btn
            dark
            icon
						@click="$router.go(-1)"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn
            dark
            icon
            class="mr-4"
						@click="edit"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>

          <v-btn
            dark
            icon
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-card-title>

        <v-spacer></v-spacer>

        <v-card-title class="white--text pl-12 pt-12">
          <div class="display-1 pl-12 pt-12">
            {{user.name}}
          </div>
        </v-card-title>
      </v-row>
    </v-img>

    <v-list two-line>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="indigo">
            mdi-phone
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{user.phone_number}}</v-list-item-title>
          <v-list-item-subtitle>Mobile</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-icon>
          <v-icon>mdi-message-text</v-icon>
        </v-list-item-icon>
      </v-list-item>

      <v-divider inset></v-divider>

      <v-list-item>
        <v-list-item-icon>
          <v-icon color="indigo">
            mdi-email
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{user.email}}</v-list-item-title>
          <v-list-item-subtitle>Personal</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider inset></v-divider>

      <v-list-item>
        <v-list-item-icon>
          <v-icon color="indigo">
            mdi-map-marker
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{user.address}}, {{user['custom:Area']}}</v-list-item-title>
          <v-list-item-subtitle>Kaiga Township, Mallapur, Uttara Kannada</v-list-item-subtitle>
					<v-list-item-subtitle>Karnataka- 581400</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
	name: 'user-profile',
	props: ['user'],
	computed: {
		loader() {
			return this.$store.getters.showLoader
		}
	},
	methods: {
		edit() {
			this.$emit('edit')
		}
	}
}
</script>