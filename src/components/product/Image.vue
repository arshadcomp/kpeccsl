<template>
	<amplify-s3-image v-if="inS3Storage" :img-key="imgUrl" />
	<v-img v-else :src="imgSrc"> </v-img>
</template>

<style scoped>
amplify-s3-image {
	--height: 30rem;
	--width: 100%;
}
</style>


<script>
export default {
	name: "product-image",
	props: {
		imgUrl: {
			type: String,
			required: false,
		},
		large: {
			type: Boolean,
			default: () => {
				return false;
			},
		},
		hsn: {
			type: String,
			deafult: () => {
				return "";
			},
		},
	},
	computed: {
		inS3Storage() {
			return this.imgUrl && !this.imgUrl.includes("http");
		},
		imgSrc() {
			let url = "https://source.unsplash.com/Hz4FAtKSLKo";
			if (this.imgUrl) url = this.imgUrl;
			// else {
			// 	const category = this.$store.getters.productCategory(this.hsn);
			// 	if (category && category.images)
			// 		url = category.images[
			// 			Math.floor(Math.random() * category.images.length)
			// 		];
			// }
			return this.large ? url : url + "/400x400";
		},
	},
};
</script>
