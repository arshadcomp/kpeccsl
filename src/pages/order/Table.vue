<template>
	<v-data-table
		v-model="selected"
		:headers="headers"
		:items="orders"
		item-key="id"
		show-select
		class="elevation-1 mt-6"
	>
		<template v-slot:top>
			<v-toolbar flat>
				<v-select
					v-model="localStatus"
					:items="selectStatus"
					label="Select Status"
					dense
					outlined
					hide-details
				>
				</v-select>
				<v-spacer></v-spacer>
				<v-btn color="primary" class="mr-6" @click="updateStatus">
					PUSH TO {{ localStatus }}
				</v-btn>
				<v-btn v-if="nextToken" color="warning" class="mr-6" @click="loadMore">
					LOAD MORE
				</v-btn>
				<v-btn color="secondary" @click="print"> PRINT </v-btn>
				<!-- <v-btn color="secondary" @click="updateCustomer"> UPDATE CUSTOMER </v-btn> -->
				<v-dialog v-if="order.customer" v-model="dialog" width="500">
					<v-card>
						<v-card-title class="headline grey lighten-2">
							{{order.customer.name}}
						</v-card-title>

						<v-card-text>
							<v-list>
								<template v-for="item in order.items">
									<v-list-item :key="item.id">
										<v-list-item-content>
											{{ item.name }}
										</v-list-item-content>
										<v-list-item-icon>
											{{ item.quantity }}
										</v-list-item-icon>
									</v-list-item>
									<v-divider :key="item.name"></v-divider>
								</template>
							</v-list>
						</v-card-text>

						<v-divider></v-divider>

						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="primary" text @click="dialog = false"> OK </v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</v-toolbar>
		</template>
		<template v-slot:[`item.createdAt`]="{ item }">
			{{
				new Date(item.createdAt).toLocaleDateString("en-GB") +
				" " +
				new Date(item.createdAt).toLocaleTimeString("en-GB")
			}}
		</template>
		<!-- <template v-slot:[`item.name`]="{ item }">
			{{attributeFromUser(item.customer, 'name')}}
		</template>
		<template v-slot:[`item.mobile`]="{ item }">
			{{mobile(item.customer)}}
		</template>
		<template v-slot:[`item.address`]="{ item }">
			{{address(item.customer)}}
		</template>
		<template v-slot:[`item.area`]="{ item }">
			{{area(item.customer)}}
		</template>
		<template v-slot:[`item.itemsCount`]="{ item }">
			{{
				item.items
					.reduce((total, item) => {
						return total + item.price * item.quantity;
					}, 0)
					.toFixed(2)
			}}
		</template> -->
		<template v-slot:[`item.actions`]="{ item }">
			<v-icon small color="indigo" @click="showItems(item)"> mdi-eye </v-icon>
		</template>
	</v-data-table>
</template>

<script>
import { jsPDF } from "jspdf";

export default {
	created() {
		this.initiate()
	},
	computed: {
		orders() {
			// return this.$store.getters.ordersByStatus(this.status);
			return this.$store.getters.ordersByStatusBySeller(this.status);
		},
		nextToken() {
			return this.$store.getters.nextToken;
		},
		
	},
	methods: {
		async initiate() {
			this.status = this.$route.params.status.toUpperCase();
			this.localStatus = this.status
			console.log("STATUS", this.status);
			this.$store.commit('NEXT_TOKEN', null)
			await this.$store.dispatch('listOrdersbyStatusByUser', {
				status: this.status,
				limit: 10,
				nextToken: null
			})
			
			// await this.$store.dispatch("listOrdersByStatusWithOwner", {
			// 	status: this.status,
			// 	nextToken: null,
			// });
		},
		updateStatus() {
			console.log("SELECTED", this.selected);
			console.log("STATUS", this.localStatus);
			let history = []
			this.selected.forEach(o => {
				history = JSON.parse(JSON.stringify(o.history))
				history.push({name: this.localStatus, createdAt: new Date().toISOString() })
				this.$store.dispatch('updateOrder', {id: o.id, status: this.localStatus, history: history })
			})
			this.selected = []
		},
		loadMore() {
			this.$store.dispatch("listOrdersbyStatusByUser", {
				limit: 10,
				status: this.status,
				nextToken: this.nextToken,
			});
			// this.$store.dispatch("listOrdersByStatusWithOwner", {
			// 	status: this.status,
			// 	nextToken: this.nextToken,
			// });
		},
		showItems(orderItem) {
			console.log("ITEMS", orderItem);
			this.order = orderItem;
			this.dialog = true;
		},
		// updateCustomer() {
		// 	this.orders.forEach((order) => {
		// 		this.$store.dispatch('updateOrder', {
		// 			id: order.id,
		// 			sellerID: order.sellerID ? order.sellerID : 1,
		// 			customer: {
		// 				address: this.$store.getters.attributeFromUser(order.customer, 'address'),
		// 				email: this.$store.getters.attributeFromUser(order.customer, 'email'),
		// 				name: this.$store.getters.attributeFromUser(order.customer, 'name'),
		// 				phone_number: this.$store.getters.attributeFromUser(order.customer, 'phone_number'),
		// 				sub: order.owner
		// 			}
		// 		})
		// 	})
		// },
		print() {
			console.log("RPINT");
			const doc = new jsPDF();
			doc.setFontSize(20);
			doc.setFontSize(10);
			let y = 25;
			let products = []
			let index
			let length = 0;

			const ordersSortedByTime = [...this.orders]
			ordersSortedByTime.sort((o1,o2) => o1.createdAt > o2.createdAt)

			ordersSortedByTime.forEach((order) => {
				doc.setFontSize(10);
				length = 50 + order.items.length;
				if (y + length > 270) {
					doc.addPage();
					y = 20;
				}
				doc.text("ORDER ID: " + order.id.toUpperCase(), 10, y);
				doc.text("DATE & TIME: " + new Date(order.createdAt).toLocaleDateString('en-GB')+' '+new Date(order.createdAt).toLocaleTimeString('en-GB'), 180, y, {align: 'right'});
				// doc.text(this.$store.getters.attributeFromUser(order.customer, 'name'), 10, y + 6);
				doc.text(order.customer.name, 10, y + 6);
				// doc.text(this.$store.getters.attributeFromUser(order.customer, 'address')
				doc.text(order.customer.address +
						" Kaiga Township, Mallapur, Uttara Kannada, Karanataka-581400",
					10,
					y + 10
				);
				// doc.text(this.$store.getters.attributeFromUser(order.customer, 'phone_number'), 10, y + 14);
				doc.text(order.customer.phone_number, 10, y + 14);
				doc.text("Total Amount", 10, y + 20);
				doc.text(
					"Rs " +
						order.items.reduce((total, item) => {
							return total + item.price * item.quantity;
						}, 0).toFixed(2),
					120,
					y + 20
				);
				order.items.forEach((item) => {
					// This will only work if prodcuts loaded already
					doc.text(this.$store.getters.productById(item.id).code, 10, y + 30);
					doc.text(item.name, 35, y + 30);
					doc.text(item.quantity.toFixed(2)+' '+item.unit, 100, y+30);
					doc.text(" X Rs. " + item.price.toFixed(2), 140, y + 30, {align: 'right'});
					doc.text((item.quantity*item.price).toFixed(2), 160, y + 30, {align: 'right'});
					y = y + 4;

					// For Summary
					index = products.findIndex(p => p.id===item.id)
					if(index===-1) {
						products.push({id: item.id, name:item.name, quantity: item.quantity, unit:item.unit})
					} else {
						products[index].quantity += item.quantity
					}
				});
				y = y + length;
			});

			if(this.$store.getters.sellerId === 17) {
				console.log('SUMMARY', products)
				doc.addPage();
				y = 10;
				doc.text('Item Summary', 10, y);
				products.forEach(product => {
					doc.text(product.name, 10, y + 30);
					doc.text(''+product.quantity.toFixed(2), 50, y + 30);
					doc.text(product.unit, 60, y + 30);
					y = y + 4;
				})
			}

			doc.save("KPECCSL.pdf");
		},
		// name(customer) {
		// 	const area = customer.UserAttributes.find(c => c.Name==='name')
		// 	return area ? area.Value : ''
		// },
		// mobile(customer) {
		// 	const area = customer.UserAttributes.find(c => c.Name==='phone_number')
		// 	return area ? area.Value : ''
		// },
		// address(customer) {
		// 	const area = customer.UserAttributes.find(c => c.Name==='address')
		// 	return area ? area.Value : ''
		// },
		// area(customer) {
		// 	const area = customer.UserAttributes.find(c => c.Name==='custom:area')
		// 	return area ? area.Value : ''
		// },
		// attributeFromUser(customer, attribute) {
		// 	return this.$store.getters.attributeFromUser(customer, attribute)
		// }
	},
	data() {
		return {
			status: '',
			localStatus: '',
			selectStatus: ["PENDING", "CONFIRMED", "PACKED", "DELIVERED"],

			singleSelect: false,
			selected: [],
			headers: [
				{ text: "ID", value: "id" },
				{ text: "Date & Time", value: "createdAt" },
				{ text: "Name", value: "customer.name" },
				{ text: "Mobile No", value: "customer.phone_number" },
				{ text: "Address", value: "customer.address" },
				// { text: "Mobile", value: "mobile", sortable: true },
				// { text: "Address", value: "address", sortable: true },
				// { text: "Area", value: "area" },
				// { text: "Items", value: "items.length" },
				// { text: "Amount", value: "itemsCount" },
				{ text: "Actions", value: "actions", sortable: false },
			],
			dialog: false,
			order: {},
		};
	},
	watch: {
    '$route.params.status': function () {
      this.initiate()
    }
  },
};
</script>