import Index from '@/pages/order/Index';
import Table from '@/pages/order/Table';

export default {
	path: '/order',
	component: Index,
	meta: {
		requiresAuth: true,
	},
	children: [
		{
			path: 'table/:status',
			name: 'orderTable',
			component: Table
		}
	]
}