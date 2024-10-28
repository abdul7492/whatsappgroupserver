import express from 'express';
import {
     addToCart, getUserOrders, removeItemFromCart, checkoutOrder, getOrderHistory, setstatus
     } from '../controllers/order.controller.js';

import { upload1, handleMulterError } from '../middlewares/multer.middleware.js';
const router = express.Router();


// Add to cart route (no auth required)
router.post('/add', addToCart);

router.get('/myorders',  getUserOrders);

router.delete('/:orderId/:itemId', removeItemFromCart);

router.post('/checkout', upload1, handleMulterError, checkoutOrder);

router.get('/history', getOrderHistory);

router.post('/status', setstatus);



export default router;
