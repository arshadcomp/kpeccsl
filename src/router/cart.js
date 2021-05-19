import Index from '@/pages/cart/Index';
import Items from '@/pages/cart/Items';
import Checkout from '@/pages/cart/Checkout';
import Confirm from '@/pages/cart/Confirm';

export default {
	path: '/cart',
    component: Index,
    meta: {
        requiresAuth: true
    },
	children: [
		{
			path: '',
			component: Items
		},
		{
			path: 'checkout',
			component: Checkout
        },
        {
			path: 'confirm',
			component: Confirm
		}
	]
}