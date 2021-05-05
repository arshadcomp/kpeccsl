<template>
	<div :class="this.class">{{name}}</div>
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