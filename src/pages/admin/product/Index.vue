<template>
	<v-sheet>
		<div class="mb-3">
			<h3>Bulk Delete</h3>
			<v-btn
				@click="bulkDeleteInvetory"
				color="error"
				class="mr-3"
			>
			DELETE ALL INVENTORY
			</v-btn>
			<v-btn
				@click="bulkDeleteProduct"
				color="error"
			>
			DELETE ALL PRODUCTS
			</v-btn>
		</div>
		
		<div class="mb-3">
			<h3>Update All Products Static From Tally</h3>
			<v-sheet>
				<v-file-input
					v-model="rawFile"
					accept=".json"
					truncate-length="24"
				></v-file-input>
				<v-btn
					class="mr-3"
					@click="uploadFile"
				>
				UPLOAD
				</v-btn>
				<v-btn
					@click="updateData"
				>
				UPDATE DATA
				</v-btn>
			</v-sheet>
		</div>

		<div class="mb-3">
			<h3>Upload Static Data File</h3>
			<v-sheet>
				<v-file-input
					v-model="staticDataFile"
					accept=".json"
					truncate-length="24"
				></v-file-input>
				<v-btn
					class="mr-3"
					@click="uploadFile(staticDataFile)"
				>
				UPLOAD
				</v-btn>
			</v-sheet>

		</div>



		<v-card v-for="item in items" :key="item.id">
			<v-card-subtitle>{{item.name}}</v-card-subtitle>
		</v-card>
	</v-sheet>
</template>

<script>
import { Storage } from 'aws-amplify';

// import raw from '@/data/kpeccsl.json'

export default {
	name: 'admin-product-index',
	async mounted() {
		// let items = raw.RAIDRRRep.slice(0,10)
		// console.log('ITEMS', items)
		// items.forEach(item => {
		// 	item.name = item.name.trim().substr(0, item.name.indexOf('*'))
		// 	item.keyword = item.name.toLowerCase().replace(/[0-9]/g, '')
		// 	item.seller = { gstin: '29AAAAK3464F1ZO', name: 'KPECCSL' }
		// 	item.leastCount = 1
		// 	item.featured = false
		// 	if(item.stock === undefined)
		// 		item.stock = 0
		// });
		// console.log('ITEMS', items)

		// this.$store.dispatch('bulkAddProduct', items)

		// FOR READING STATIC DATA
		// const staticData = await Storage.get('static.json', { download: true})
		// const fr = new FileReader()
		// const blob = new Blob([staticData.Body], {type:"application/json"});
		// fr.addEventListener("load", () => {
		// 	console.log('READING FILE')
		// 	var items = JSON.parse(fr.result)
		// 	console.log('ITEMS IN FILE', items)
		// });

		// fr.readAsText(blob);
	},
	data() {
		return {
			rawFile: null,
			staticDataFile: null,
			items: []
		}
	},
	methods: {
		bulkDeleteInvetory() {
			// this.$store.dispatch('deleteInventory', 'f82b3b83-75bc-45cd-83bc-065309889486')
			this.$store.dispatch('bulkDeleteInventory')
		},
		bulkDeleteProduct() {
			console.log('BULK DELETE PRODUCT')
			// this.$store.dispatch('deleteProduct', {'id': 'f0a805dc-46a8-4fe6-8eb0-4bb3288566a5'})
			this.$store.dispatch('bulkDeleteProduct')
		},
		uploadFile(file) {
			console.log('FILE UPLOAD')
			console.log('FILE', file)

			// If file is to be uploaded to S3
			
			Storage.put(file.name, file, {
				contentType: file.type
			})
			.then(response => {
				console.log('FILE UPLOADED', response)
			})
			.catch(error => {
				console.log('ERROR UPLOADING FILE', error)
			})
		},
		updateData() {
			const fr = new FileReader()
			const blob = new Blob([this.rawFile], {type:"application/json"});

			fr.addEventListener("load", () => {
				console.log('READING FILE')
				// console.log(e.target.result, JSON.parse(fr.result))
				// console.log('EVENT', e.target.result.substring(0,10))
				var items = JSON.parse(fr.result).RAIDRRRep
				console.log('ITEMS IN FILE', items)
				this.batchAddProduct(items)
			});

			fr.readAsText(blob);
		},
		batchAddProduct(items) {
			items.forEach(item => {
				// item.name = item.name.trim().substr(0, item.name.indexOf('*'))
				item.keyword = item.name.toLowerCase().replace(/[0-9]/g, '')
				item.seller = { gstin: '29AAAAK3464F1ZO', name: 'KPECCSL' }
				item.leastCount = 1
				item.featured = false
				if(item.stock === undefined)
					item.stock = 0
			});
			console.log('ITEMS FORMATTED', items)

			this.$store.dispatch('bulkAddProduct', items)
		}
	}
}
</script>