<template>
	<v-img v-if="!imgKey && $vuetify.breakpoint.mobile"
		:src="defaultImg"
	>
	</v-img>
	<v-img
		v-else-if="!imgKey && !$vuetify.breakpoint.mobile"
		height="250"
		:src="defaultImg"
	>
	</v-img>
	<amplify-s3-image v-else-if="imgKey && inS3Storage" :img-key=imgKey />
	<v-img
		v-else
		height="250"
		:src="imageUrl"
	></v-img>
</template>

<style scoped>
amplify-s3-image {
  --height: 30rem;
  --width: 100%;
}
</style>


<script>
export default {
	name: 'product-image',
	props: ['imageUrl', 'hsn'],
	computed :{
		category() {
			return this.$store.getters.productCategory(this.hsn ? this.hsn : '')
		},
		defaultImg() {
			if(this.category)
				return this.category.images[Math.floor(Math.random() * this.category.images.length)]
			return 'https://source.unsplash.com/Hz4FAtKSLKo/640x480'
		},
		inS3Storage() {
			return !this.imageUrl.includes("http")
		},
		imgKey() {
			if(!this.imageUrl)
				return false
			return this.imageUrl.trim()
		}
	}
}
</script>