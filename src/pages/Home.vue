<template>
	<div>
		<!-- <v-dialog
      :value="true"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          Closed for the day
        </v-card-title>
        <v-card-text>Due to COVID vaccination of the employees, Society is closed for the day.</v-card-text>
      </v-card>
    </v-dialog> -->
		<!-- <v-alert type="info" border="left">
			Due to COVID vaccination of the employees, order deliveries are delayed at least by 2 days.
		</v-alert> -->
		<Carousel/>
		<v-container class="px-0 px-lg-6" >
			<v-row class="">
				<v-col cols="12" md="4" class="px-0" v-for="product in products" :key="product.id">
					<ProductItem :id="product.id"/>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script>
import Carousel from '@/components/Carousel'
import ProductItem from '@/components/product/Item'
export default {
	name: 'home',
	async mounted() {
		if(this.$store.getters.categories.length === 0)
			this.$store.dispatch('listCategories', 100)
		if(this.$store.getters.products.length === 0)
			this.$store.dispatch('listProducts', 50)
	},
	computed: {
		// products() {
		// 	return this.$store.getters.products
		// },
		products() {
			return this.$store.getters.products.length > 12 ? this.getRandom(this.$store.getters.products, 12) : []
		},
	},
	components: {
		Carousel,
		ProductItem
	},
	methods: {
		getRandom(arr, n) {
			var result = new Array(n),
					len = arr.length,
					taken = new Array(len);
			if (n > len)
					throw new RangeError("getRandom: more elements taken than available");
			while (n--) {
					var x = Math.floor(Math.random() * len);
					result[n] = arr[x in taken ? taken[x] : x];
					taken[x] = --len in taken ? taken[len] : len;
			}
			return result;
		}
	}
}
</script>