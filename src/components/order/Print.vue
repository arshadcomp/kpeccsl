<template>
	<div>
		<v-btn color="primary" @click="print">Download PDF</v-btn>
	</div>
</template>

<script>
import { jsPDF } from 'jspdf'


export default {
	// props: ['date', 'status'],
	methods: {
		print() {
			const doc = new jsPDF();
			// const doc = new jsPDF({
			// 	orientation: "l",
			// 	// unit: "in",
			// 	// format: [4, 2]
			// });
			const orders = this.$store.getters.orders
			// let summary = []
			doc.setFontSize(20)
			doc.setFontSize(10)
			let y = 25
			// let product = {}
			let length = 0
			orders.forEach(order => {
				doc.setFontSize(10)
				length = 50 + order.items.length
				if(y+length > 300) {
					doc.addPage()
					y = 20
				}
				doc.text('ORDER ID: '+order.id.substr(0,4).toUpperCase(), 10, y)
				doc.text(''+this.$store.getters.name(order.owner), 10, y+6)
				doc.text(''+this.$store.getters.address(order.owner)+' Kaiga Township, Mallapur, Uttara Kannada, Karanataka-581400', 10, y+10)
				doc.text(''+this.$store.getters.phone(order.owner), 10, y+14)
				doc.text('Total Amount', 10, y+20)
				doc.text('Rs '+order.items.reduce((total, item) => { return total + item.price*item.quantity}, 0) , 120, y+20)
				order.items.forEach(item => {
					doc.text(item.name, 10, y+30)
					doc.text(item.quantity+' X Rs.'+item.price, 80, y+30)
					y = y+4
				})
				y= y+length
			});
			
			doc.addPage('a4', 'l')
			y=10
			let i=1;
			doc.text('Sr.', 10, y)
			doc.text('Order ID', 16, y)
			doc.text('Name', 40, y)
			doc.text('Qtr No', 125, y)
			doc.text('Mobile No', 140, y)
			doc.text('Amount', 175, y)
			doc.text('QR Code', 195, y)
			doc.text('Card', 210, y)
			doc.text('Cash', 225, y)
			doc.text('Recieved By', 240, y)
			doc.text('Remarks', 260, y)
			y = y+10

			orders.forEach(order => {
				if(y > 200) {
					doc.addPage()
					y = 10
				}
				doc.text(String(i++), 10, y)
				doc.text(order.id.substr(0,4).toUpperCase(), 16, y)
				doc.text(''+this.$store.getters.name(order.owner).substr(0,60), 40, y)
				doc.text(''+this.$store.getters.address(order.owner).substr(0, 10), 125, y)
				doc.text(''+this.$store.getters.phone(order.owner), 140, y)
				doc.text('', 175, y)
				doc.text('', 195, y)
				doc.text('', 210, y)
				doc.text('', 225, y)
				doc.text('', 240, y)
				doc.text('', 260, y)
				y = y+6
			})

			doc.save("KPECCSL.pdf");
		}
	}
}
</script>