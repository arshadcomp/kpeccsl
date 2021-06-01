<template>
	<v-card>
		<v-card-title>Dashboard</v-card-title>
		<v-card-subtitle>
			Soon, you will be able generate monthly sales report here.
		</v-card-subtitle>
		<v-card-text>
			<v-icon
        :color="'indigo'"
        size="64"
      >
        mdi-heart-pulse
      </v-icon>
			<v-sparkline
				:value="value"
				:smooth="radius || false"
				:padding="padding"
				:line-width="width"
				:stroke-linecap="lineCap"
				:fill="fill"
				:type="type"
				:auto-line-width="autoLineWidth"
				auto-draw
			></v-sparkline>
			<v-subheader>Monthly Sales</v-subheader>
		</v-card-text>
	</v-card>
</template>

<script>

export default {
	name: 'home',
	data: () => ({
		width: 0.5,
		radius: 10,
		padding: 8,
		lineCap: 'round',
		value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
		fill: false,
		type: 'trend',
		autoLineWidth: false,
	}),
}
</script>