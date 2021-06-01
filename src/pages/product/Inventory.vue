<template>
	<div class="mb-3">
		<h3>Update Products Inventory From Tally</h3>
		<v-spacer></v-spacer>
		<v-sheet>
			<v-file-input
				v-model="inventoryFile"
				accept=".xls"
				truncate-length="24"
			></v-file-input>
			<v-btn
				class="mr-3"
				v-if="inventoryFile"
				@click="uploadFile(inventoryFile)"
				:disabled="inventoryFile && fileUploaded"
			>
				<v-icon v-if="inventoryFile && !fileUploaded">mdi-timer-sand</v-icon>
				UPLOAD
			</v-btn>
			<v-btn
				class="mr-3"
				v-if="inventoryFile && fileUploaded"
				@click="loadInventoryFile"
				:disabled="disabled"
			>
				<v-icon v-if="disabled">mdi-timer-sand</v-icon>
				LOAD INVENTORY
			</v-btn>
			<v-btn v-if="items.length > 0" @click="batchUpdateInventory" :disabled="loader">
				UPDATE <span v-if="nextToken" class="mx-2"> MORE </span> INVENTORY
			</v-btn>
		</v-sheet>
		<v-sheet class="my-6" v-if="updatedProductsCount > 0">
			<v-chip class="ma-2" color="red" text-color="white">
				{{ updatedProductsCount }} Products Updated With Inventory
			</v-chip>
			<span v-if="loader">Wait before Update...</span>
		</v-sheet>
	</div>
</template>
 
<script>
import { Storage } from "aws-amplify";
import readXlsxFile from "read-excel-file";

export default {
	name: "inventory-update",
	data() {
		return {
			fileUploaded: false,
			inventoryFile: null,

			products: [],
			items: [],
			updatedProductsCount: 0,

			disabled: false,
		};
	},
	computed: {
		loader() {
			return this.$store.getters.loader
		},
		nextToken() {
			return this.$store.getters.nextToken;
		},
	},
	methods: {
		uploadFile(file) {
			console.log("FILE UPLOAD");
			console.log("FILE", file);
			this.$store.commit("NEXT_TOKEN", null);
			this.products = [];
			this.items = [];
			this.updatedProductsCount = 0;

			// If file is to be uploaded to S3
			if (file) {
				Storage.put(file.name, file, {
					contentType: file.type,
				})
					.then((response) => {
						console.log("FILE UPLOADED", response);
						this.fileUploaded = true;
					})
					.catch((error) => {
						console.log("ERROR UPLOADING FILE", error);
					});
			}
		},
		loadInventoryFile() {
			//convert excel to json here
			this.disabled = true
			readXlsxFile(this.inventoryFile).then((rows) => {
				this.items = this.formatAsProducts(rows);
				// this.disabled = false
			});
		},
		formatAsProducts(rows) {
			let products = [];
			let product = {};
			rows.splice(0, 4);
			rows.forEach((item) => {
				product = {
					hsn: item[1],
					code: item[2],
					name: item[3],
					tax: item[4],
					mrp: item[5],
					unit: item[6],
					purchase_rate: item[7],
					rate: item[8],
					gst: item[9],
					price: item[10],
					inventory: {
						stock: item[11],
					},
				};
				products.push(product);
			});
			return products;
		},
		async batchUpdateInventory() {
			this.products = await this.$store.dispatch(
				"listProducts",
				{ limit: 100, withInventory: true }
			);
			this.products.forEach((product) => {
				const item = this.items.find((item) => item.code === product.code);
				if (item) {
					// console.log("ITEM", item);
					if (item.inventory.stock === undefined || item.inventory.stock === null || item.inventory.stock < 0) item.inventory.stock = 0;
					if (product.inventory.stock !== item.inventory.stock) {
						// console.log("UPDATE INVENTORY");
						this.$store.dispatch("updateInventory", {
							id: product.inventory.id,
							stock: item.inventory.stock,
						});
					}
					if (product.price !== item.price) {
						// console.log("UPDATE PRODUCT PRICE", item, product);
						this.$store.dispatch("updateProduct", {
							id: product.id,
							purchase_rate: item.purchase_rate,
							mrp: item.mrp,
							rate: item.rate,
							gst: item.gst,
							price: item.price,
						});
					}
				}
			});
			this.updatedProductsCount += this.products.length
		}
	},
};
</script>