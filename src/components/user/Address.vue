<template>
	<v-sheet flat class="text-small grey--text text--darken-2" v-if="multiline">
		{{address}}, {{area}},<br>
		Kaiga Township, Mallapur, Karwar,<br>
		Uttara Kannada, Karnataka - 581400<br>
		PIN-581400
	</v-sheet>
	<v-sheet flat class="text-subtitle-1" v-else>
		{{address}}, {{area}},
		Kaiga Township, Mallapur, Karwar,
		Uttara Kannada, Karnataka - 581400
	</v-sheet>
</template>

<script>
export default {
	name: 'user-address',
	props: ['address', 'area', 'multiline']

}
</script>