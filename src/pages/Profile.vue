<template>
  <ProfileForm v-if="user && isEditing" :user="JSON.parse(JSON.stringify(user.attributes))" @edit="edit"/>
  <ProfileView v-else-if="user" :user="user.attributes" @edit="edit"/>
</template>

<script>
import ProfileView from '@/components/user/View'
import ProfileForm from '@/components/user/Form'

export default {
  name: 'profile',
  data() {
    return {
      isEditing: false
    }
  },
	computed: {
		user() {
			return this.$store.getters.user
		}
  },
  components: {
    ProfileView,
    ProfileForm
  },
  methods: {
    edit() {
      this.isEditing = !this.isEditing
    }
  }
}
</script>