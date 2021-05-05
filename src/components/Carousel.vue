<template>
  <v-sheet class="mx-n3 mx-md-0 mt-n3 mb-3">
		<v-carousel :show-arrows="!$vuetify.breakpoint.mobile">
			<v-carousel-item
				v-for="(item,i) in items"
				:key="i"
				:src="item.src"
			></v-carousel-item>
		</v-carousel>
	</v-sheet>
</template>

<script>
  export default {
		name: 'Caraousel',
    data () {
      return {
				items: this.$vuetify.breakpoint.mobile ? 
				[
          {
            src: 'https://source.unsplash.com/PfAFNYL-qXY/600x960',
          },
          {
            src: 'https://source.unsplash.com/J83LcLGsy_4/600x960',
          },
          {
            src: 'https://source.unsplash.com/SvhXD3kPSTY/600x960',
          },
          {
            src: 'https://source.unsplash.com/k2ojxtdasIQ/600x960',
          },
          {
            src: 'https://source.unsplash.com/BFdSCxmqvYc/600x960',
          },
        ] :
				[
          {
            src: 'https://source.unsplash.com/PfAFNYL-qXY/1920x1280',
          },
          {
            src: 'https://source.unsplash.com/5ze1ouvzSM8/1920x1280',
          },
          {
            src: 'https://source.unsplash.com/SvhXD3kPSTY/1920x1280',
          },
          {
            src: 'https://source.unsplash.com/k2ojxtdaslQ/1920x1280',
          },
          {
            src: 'https://source.unsplash.com/BFdSCxmqvYc/1920x1280',
          },
        ],
      }
    },
  }
</script>