import express from 'express';
import { getCategory, createCategory,  updateCategory, deleteCategory} from '../controllers/admin.controller.js';

const router = express.Router();

// Admin protected routes
router.get('/category',  getCategory);
// Create new category (Admin only)
router.post('/category/add',  createCategory);

// edit a category
router.put('/category/:id', updateCategory);

// Delete a category (Admin only)
router.delete('/category/:id', deleteCategory);

export default router;
