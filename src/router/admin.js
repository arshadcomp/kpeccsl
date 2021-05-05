// import Info from '@/components/admin/Info';
import Index from '@/pages/admin/Index';
import ProductIndex from '@/pages/admin/product/Index';
import ProductList from '@/pages/admin/product/List';
// import New from '@/pages/admin/New';
// import Products from '@/pages/admin/Products';
// import Edit from '@/pages/admin/Edit';
// import View from '@/pages/admin/View';

// import CreateProduct from '@/pages/admin/product/Create';
// import ViewProduct from '@/pages/admin/product/View';
// import ListProduct from '@/pages/admin/product/List';
import UpdateProduct from '@/pages/admin/product/Update';
import UpdateProductStock from '@/pages/admin/product/UpdateStock';

// import CreateMessage from '@/pages/admin/message/Create';
// import ViewMessage from '@/pages/admin/message/View';
// import ListMessage from '@/pages/admin/message/List';
// import UpdateMessage from '@/pages/admin/message/Update';

import ListImage from '@/pages/admin/Images';

import Orders from '@/pages/admin/Orders';

export default {
	path: '/admin',
	component: Index,
	meta: {
		requiresAuth: true,
		admin: true
	},
	children: [
		{
			path: 'product',
			name: 'ProductIndex',
			component: ProductIndex
		},
		{
			path: 'product/list',
			name: 'ProductList',
			component: ProductList
		},
		// {
		// 	path: 'new',
		// 	name: 'New',
		// 	component: New
		// },
		// {
		// 	path: 'products',
		// 	name: 'Products',
		// 	component: Products
		// },
		{
			path: 'orders',
			name: 'AdminOrders',
			component: Orders
		},
		{
			path: 'images',
			name: 'ListImage',
			component: ListImage
		},
		// {
		// 	path: 'edit/:id',
		// 	name: 'Edit',
		// 	component: Edit
		// },
		// {
		// 	path: 'view/:id',
		// 	name: 'View',
		// 	component: View
		// },
		// //Product Admin paths
		// {
		// 	path: 'product/create',
		// 	name: 'CreateProduct',
		// 	component: CreateProduct
		// },
		// {
		// 	path: 'product/view/:id',
		// 	name: 'ViewProduct',
		// 	component: ViewProduct
		// },
		// {
		// 	path: 'product/list',
		// 	name: 'ListProduct',
		// 	component: ListProduct
		// },
		{
			path: 'product/update/:id',
			name: 'UpdateProduct',
			component: UpdateProduct
		},
		{
			path: 'product/updatestock/:id',
			name: 'UpdateProductStock',
			component: UpdateProductStock
		},
		// //Message Admin Paths
		// {
		// 	path: 'message/create',
		// 	name: 'CreateMessage',
		// 	component: CreateMessage
		// },
		// {
		// 	path: 'message/view/:id',
		// 	name: 'ViewMessage',
		// 	component: ViewMessage
		// },
		// {
		// 	path: 'message/list',
		// 	name: 'ListMessage',
		// 	component: ListMessage
		// },
		// {
		// 	path: 'message/update/:id',
		// 	name: 'UpdateMessage',
		// 	component: UpdateMessage
		// },
		//Image Album path
		// {
		// 	path: 'image/list',
		// 	name: 'ListImage',
		// 	component: ListImage
		// },
	]
}