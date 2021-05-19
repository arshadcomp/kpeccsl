<template>
	<v-sheet flat>
		<span>Mobile No: </span><span class="font-weight-bold">{{phone_number}}</span>
	</v-sheet>
</template>

<script>
export default {
	name: 'user-phone',
	props: ['phone_number'],
}
</script>