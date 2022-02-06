import express from 'express';
import userRoutes from './users.routes.js'
import authRoutes from './auth.routes.js'
import adminRoutes from './admin.routes.js'
import productsRoutes from './Items/products.routes.js'
import categoryRoutes from './Items/categories.routes.js'
import brandRoutes from './Items/brands.routes.js'
import {isAdmin, isLoggedIn} from '../middlewares/index.js'

const router = express.Router();

router.use('/user', userRoutes);
router.use('/auth', authRoutes);

router.use('/admin',  adminRoutes);
router.use('/products',  productsRoutes);
router.use('/categories', categoryRoutes);
router.use('/brands', brandRoutes);

export default router;
