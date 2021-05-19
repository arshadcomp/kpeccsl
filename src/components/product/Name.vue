<template>
	<div :class="this.class" v-if="name">{{name.split('*')[0]}}</div>
</template>

<script>
export default {
	name: 'product-name',
	props: ['name', 'truncate'],
	data() {
		return {
			class: (this.truncate ? 'text-truncate' : '') +' text-h6'
		}
	}
}
</script>