<template>
	<v-sheet>
		<span class="text-h6 text-md-h4 mr-3">&#8377;{{product.price}}</span>
		<span class="subtitle-1 grey--text text-decoration-line-through mr-3">{{product.mrp}}</span>
		<span class="subtitle-1 green--text mr-3">{{ Math.floor(((product.mrp - product.price)/product.mrp)*100) }}% off</span>
	</v-sheet>
</template>

<script>
export default {
	name: 'product-price',
	props: ['product'],
}
</script>