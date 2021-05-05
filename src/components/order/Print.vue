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
			const orders = this.$store.getters.orders
			// let summary = []
			doc.setFontSize(20)
			// doc.text(this.status+" Orders for "+this.date.toDateString(), 10, 20);
			doc.setFontSize(10)
			let y = 25
			// let product = {}
			
			orders.forEach(order => {
				doc.setFontSize(10)
				doc.text('ORDER ID: '+y+''+order.id.substr(0,4).toUpperCase(), 10, y+10)
				doc.text(''+this.$store.getters.name(order.owner), 10, y+20)
				doc.text(''+this.$store.getters.address(order.owner), 10, y+30)
				doc.text(''+this.$store.getters.phone(order.owner), 10, y+40)
				order.items.forEach(item => {
					doc.text(item.name, 10, y+50)
					doc.text(item.quantity+' X Rs.'+item.price, 80, y+50)
					y = y+10
					if(y > 240) {
						doc.addPage()
						y = 0
					}
				})
				// y= y+order.items.length*10
				doc.setFontSize(16)
				doc.text('Total Amount'+y, 10, y+order.items.length*50)
				doc.text('Rs '+order.items.reduce((total, item) => { return total + item.price*item.quantity}, 0) , 120, y+order.items.length*50)
				y= y+order.items.length*10 + 60
				if(y > 240) {
					doc.addPage()
					y = 0
				}
			});
			
			doc.addPage()
			y=0
			
			// summary = summary.reduce((acc, cur) => {
			// 		const existType = acc.find(a => a.id === cur.id);
			// 		if (existType) {
			// 				existType.quantity += +cur.quantity;
			// 				return acc;
			// 		}
			// 		acc.push({
			// 				id: cur.id,
			// 				name: cur.name,
			// 				price: cur.price,
			// 				quantity: +cur.quantity
			// 		});
			// 		return acc;
			// }, []);



			y+=20
			doc.setFontSize(20)
			doc.text('Summary', 10, y)
			doc.setFontSize(10)
			y+=10

			let total = 0
			// summary.forEach(product => {
			// 	if(y > 200) {
			// 		doc.addPage()
			// 		y = 0
			// 	}
			// 	doc.text(product.name, 10, y)
			// 	doc.text(product.quantity+' Kg', 50, y)
			// 	doc.text('X Rs. '+product.price, 65, y)
			// 	doc.text(''+product.quantity*product.price , 100, y)
			// 	total += product.quantity*product.price
			// 	y = y+10
			// })
			doc.setFontSize(20)
			doc.text('Total', 80, y)
			doc.text(''+total, 100, y)
			doc.setFontSize(10)

			doc.save("KPECCSL.pdf");
		}
	}
}
</script>