import Index from '@/pages/product/Index';
import Create from '@/pages/product/Create';
import View from '@/pages/product/View';
import List from '@/pages/product/List';
import Table from '@/pages/product/Table';
import Update from '@/pages/product/Update';
import Inventory from '@/pages/product/Inventory';

import Category from '@/pages/product/Category';

export default {
	path: '/product',
	component: Index,
	meta: {
		requiresAuth: true,
	},
	children: [
		{
			path: 'create',
			component: Create
		},
		{
			path: 'view',
			component: View
		},
		{
			path: 'list',
			component: List
		},
		{
			path: 'table',
			component: Table
		},
		{
			path: 'update',
			name: 'ProductUpdate',
			component: Update
		},
		{
			path: 'inventory',
			component: Inventory
		},
		{
			path: 'category',
			component: Category
		},
	]
}