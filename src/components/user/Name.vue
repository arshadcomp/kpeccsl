<template>
	<v-sheet flat class="font-weight-bold">
		{{name.toUpperCase() }}
	</v-sheet>
</template>

<script>
export default {
	name: 'user-name',
	props: ['name'],
}
</script>