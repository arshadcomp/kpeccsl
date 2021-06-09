<template>
	<div v-if="$vuetify.breakpoint.mobile">
		<p>{{ name.split('*')[0] }}</p>
		<small class="grey--text text--caption">Seller: {{ seller.name }}</small>
	</div>
	<v-list-item-subtitle v-else class="black--text text-h6 text-capitalize">
		{{ name.split('*')[0] }}
		<v-spacer></v-spacer>
		<small class="grey--text text--caption">Seller: {{ seller.name }}</small>
	</v-list-item-subtitle>
</template>

<script>
export default {
	name: 'product-name',
	props: {
		name: {
			type: String,
			required: true
		},
		seller: {
			type: Object,
			default: () => {
				return {
					name: 'KPECCSL'
				}
			}
		}
	}
}
</script>