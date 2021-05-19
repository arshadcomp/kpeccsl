<template>
	<v-sheet>
		<!-- <div class="mb-3">
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
		</div> -->

		<div class="mb-3"> 
			<h3>Update Products Inventory From Tally</h3>
			<v-sheet>
				<v-file-input
					v-model="inventoryFile"
					accept=".json"
					truncate-length="24"
				></v-file-input>
				<v-btn
					class="mr-3"
					v-if="inventoryFile"
					@click="uploadFile(inventoryFile)"
				>
				UPLOAD
				</v-btn>
				<v-btn
					class="mr-3"
					v-if="inventoryFile && fileUploaded"
					@click="loadInventoryFile"
				>
				LOAD INVENTORY
				</v-btn>
				<v-btn
					v-if="inventoryItems.length > 0"
					@click="batchUpdateInventory"
				>
				UPDATE <span v-if="nextToken"> MORE </span> INVENTORY
				</v-btn>
			</v-sheet>
			<v-sheet class="my-6">
				<template v-for="(updatedProductsSize, i) in updatedProducts">
					<v-card :key="i" class="pa-3 mb-2">
						{{updatedProductsSize}} products updated
					</v-card>
				</template>
			</v-sheet>
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
					@click="uploadFile(rawFile)"
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
		// convert-excel-to-json --config='{"sourceFile":"Downloads/pricelist.xlsx", "header":{"rows":4}, "columnToKey":{"B":"hsn","C":"code","D":"name","E":"tax","F":"mrp","G":"unit","H":"purchase_rate","I":"rate","J":"gst","K":"price","L":"stock"} }' > Downloads/kpecs.json
	},
	data() {
		return {
			fileUploaded: false,
			inventoryFile: null,
			inventoryItems: [],
			products: [],
			nextToken: null,
			updatedProducts: [],
			
			rawFile: null,
			staticDataFile: null,
			items: [],

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
			if(file) {
				Storage.put(file.name, file, {
					contentType: file.type
				})
				.then(response => {
					console.log('FILE UPLOADED', response)
					this.fileUploaded = true
				})
				.catch(error => {
					console.log('ERROR UPLOADING FILE', error)
				})
			}
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
		},
		loadInventoryFile() {
			const fr = new FileReader()
			const blob = new Blob([this.inventoryFile], {type:"application/json"});

			fr.addEventListener("load", () => {
				console.log('READING INVENTORY FILE')
				var items = JSON.parse(fr.result).RAIDRRRep
				// console.log('ITEMS IN FILE', items)
				this.inventoryItems = items
				// this.batchUpdateInventory()
			});
			fr.readAsText(blob);
		},
		async batchUpdateInventory() {
			if(this.inventoryItems.length > 0){
				const productList = await this.$store.dispatch('productListForUpdate', this.nextToken)
				this.products = productList.items
				this.nextToken = productList.nextToken
				
				await this.products.forEach(product => {
					const item = this.inventoryItems.find(item => item.code===product.code)
					if(item) {
						if(item.price!==product.price) {
							console.log('UPDATE PRODUCT PRICE', item.name, product.price, item.price)
							this.$store.dispatch('updateProduct', { id:product.id, price: item.price })
						}

						if(item.stock === undefined || item.stock < 0)
							item.stock = 0
						if(product.inventory.stock!==item.stock) {
							console.log('UPDATE INVENTORY FOR', item.name, product.inventory.stock, item.stock)
							this.$store.dispatch('updateInventory', { id:product.inventory.id, stock: item.stock })
						}
					}
				})
				this.updatedProducts.push(this.products.length)
			}
		}
	}
}
</script>