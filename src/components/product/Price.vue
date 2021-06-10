<template>
	<v-sheet>
		<span class="text-h6 text-md-h4 mr-3">&#8377; {{price}}</span>
		<span class="subtitle-1 grey--text text-decoration-line-through mr-3">{{mrp}}</span>
		<span class="subtitle-1 green--text mr-3">{{discount }}</span>
		<v-spacer></v-spacer>
		<small class="grey--text">{{ minQuantity }}</small>
	</v-sheet>
</template>

<script>
export default {
	name: 'product-price',
	props: {
		product: {
			type: Object,
			required: true
		}
	},
	computed: {
		price() {
			const price = this.product.price*this.product.leastCount
			return price%1!=0 ? price.toFixed(2) : price
		},
		mrp() {
			const mrp = this.product.mrp*this.product.leastCount
			return mrp%1!=0 ? mrp.toFixed(2) : mrp
		},
		discount() {
			if(this.product.mrp !== 0 && this.product.price !==0)
				return Math.floor(((this.product.mrp - this.product.price)/this.product.mrp)*100) + '% off'
			return ''
		},
		minQuantity() {
			if(this.product.leastCount!==1 && this.product.unit.substr(0,2).toLowerCase()=='kg')
				return 'Min Qty: '+this.product.leastCount*1000 +' g'
			return ''
		},
	}
}
</script>