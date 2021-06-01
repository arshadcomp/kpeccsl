<template>
	<div>
		<!-- <h3>Products List</h3> -->
		<v-alert type="warning" icon="mdi-alert-circle" v-if="error"
			>Sorry, There seems to be some network issue, products could not be
			fetched. Try after some time.</v-alert
		>

		<v-data-table
			:headers="headers"
			:items="products"
			:search="search"
			sort-by="name"
			:loading="loader"
			loading-text="Loading... Please wait"
			class="elevation-1"
		>
			<template v-slot:top>
				<v-toolbar flat>
					<v-toolbar-title>Product List</v-toolbar-title>
					<v-divider class="mx-4" inset vertical></v-divider>
					<v-text-field
						v-model="search"
						append-icon="mdi-magnify"
						label="Search"
						single-line
						hide-details
					></v-text-field>
					<v-spacer></v-spacer>
					<v-btn v-if="nextToken" color="warning" class="mr-6" @click="loadMore">
						LOAD MORE
					</v-btn>
					<v-dialog v-model="dialog" max-width="500px">
						<!-- <template v-slot:activator="{ on, attrs }">
							<v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
								New Item
							</v-btn>
						</template> -->
						<v-card>
							<v-card-title>
								<span class="headline">{{ formTitle }}</span>
							</v-card-title>

							<v-card-text>
								<v-container>
									<v-row>
										<v-col cols="12" sm="12" md="12">
											<v-text-field
												v-model="editedItem.name"
												label="Name"
											></v-text-field>
										</v-col>
										<v-col cols="12" sm="12" md="12">
											<v-text-field
												v-model="editedItem.keyword"
												label="Keyword"
											></v-text-field>
										</v-col>
										<v-col cols="12" sm="6" md="4">
											<v-text-field
												v-model="editedItem.hsn"
												label="HSN"
											></v-text-field>
										</v-col>
										<v-col cols="12" sm="6" md="4">
											<v-text-field
												v-model="editedItem.rate"
												label="Rate"
											></v-text-field>
										</v-col>
										<v-col cols="12" sm="6" md="4">
											<v-text-field
												v-model="editedItem.price"
												label="Price"
											></v-text-field>
										</v-col>
									</v-row>
								</v-container>
							</v-card-text>

							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn color="blue darken-1" text @click="close">
									Cancel
								</v-btn>
								<v-btn color="blue darken-1" text @click="save"> Save </v-btn>
							</v-card-actions>
						</v-card>
					</v-dialog>
					<v-dialog v-model="dialogDelete" max-width="500px">
						<v-card>
							<v-card-title class="headline"
								>Are you sure you want to delete this item?</v-card-title
							>
							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn color="blue darken-1" text @click="closeDelete"
									>Cancel</v-btn
								>
								<v-btn color="blue darken-1" text @click="deleteItemConfirm"
									>OK</v-btn
								>
								<v-spacer></v-spacer>
							</v-card-actions>
						</v-card>
					</v-dialog>
				</v-toolbar>
			</template>
			<template v-slot:[`item.actions`]="{ item }">
				<v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
				<v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
			</template>
			<template v-slot:no-data>
				<v-btn color="primary" @click="initialize"> Reset </v-btn>
			</template>
		</v-data-table>

		<v-overlay :value="loader"></v-overlay>
	</div>
</template>

<script>
export default {
	name: "product-table",
	created() {
		this.initialize();
	},
	data() {
		return {
			search: "",
			dialog: false,
			dialogDelete: false,
			headers: [
				{ text: "Code", value: "code" },
				{ text: "HSN", value: "hsn" },
				{ text: "Name", value: "name" },
				{ text: "keyword", value: "keyword" },
				{ text: "Rate", value: "rate" },
				{ text: "Price", value: "price" },
				{ text: "Actions", value: "actions", sortable: false },
			],
			desserts: [],
			editedIndex: -1,
			editedItem: {
				name: '',
				hsn: '',
				keyword: '',
				rate: 0,
				price: 0,
			},
			defaultItem: {
				name: '',
				hsn: '',
				keyword: '',
				rate: 0,
				price: 0,
			},
		};
	},
	computed: {
		loader() {
			return this.$store.getters.loader;
		},
		error() {
			return this.$store.getters.error;
		},
		nextToken() {
			return this.$store.getters.nextToken;
		},
		products() {
			return this.$store.getters.products;
		},
		formTitle() {
			return this.editedIndex === -1 ? "New Item" : "Edit Item";
		},
	},
	watch: {
		dialog(val) {
			val || this.close();
		},
		dialogDelete(val) {
			val || this.closeDelete();
		},
	},
	methods: {
		async initialize() {
			if (this.products.length === 0) 
				await this.$store.dispatch("listProducts", {limit: 100, withInventory: false});
		},
		loadMore() {
			this.$store.dispatch("listProducts", {
				limit: 100,
				withInventory: false,
			});
		},
		editItem(item) {
			this.editedIndex = this.products.findIndex(p => p.id===item.id)
			this.editedItem = Object.assign({}, item);
			this.dialog = true;
		},

		deleteItem(item) {
			this.editedIndex = this.desserts.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this.dialogDelete = true;
		},

		deleteItemConfirm() {
			this.desserts.splice(this.editedIndex, 1);
			this.closeDelete();
		},

		close() {
			this.dialog = false;
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedIndex = -1;
			});
		},

		closeDelete() {
			this.dialogDelete = false;
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedIndex = -1;
			});
		},

		async save() {
			if (this.editedIndex > -1) {
				delete this.editedItem.createdAt
				delete this.editedItem.updatedAt
				delete this.editedItem.inventory
				await this.$store.dispatch('updateProduct', this.editedItem)
			} else {
				this.desserts.push(this.editedItem);
			}
			this.close();
		},
	},
};
</script>