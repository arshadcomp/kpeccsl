<template>
  <div class="py-5">
    <b-container class="py-5">
			<h2 class="font-courgette mb-5">Our Products</h2>
      <b-row>
        <b-col cols="12" md="4">
          <b-list-group class="mb-3">
            <b-list-group-item variant="success">Products</b-list-group-item>
            <b-list-group-item><b-link to="/product/list">View All Products</b-link></b-list-group-item>
          </b-list-group>

          <!-- <b-list-group class="mb-3">
            <b-list-group-item variant="success">Images</b-list-group-item>
            <b-list-group-item><b-link to="/admin/image/list">View All Images</b-link></b-list-group-item>
          </b-list-group> -->
        </b-col>
        <b-col cols="12" md="8">
          <router-view></router-view>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>

export default {
  // data() {
  //   return {
  //     storeStatus: this.$store.getters.storeStatus
  //   }
  // },
  // methods: {
  //   toggle() {
  //     this.$store.dispatch('setStoreStatus', this.storeStatus)
  //   }
  // }
}
</script>