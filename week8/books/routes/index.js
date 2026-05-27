import { Router } from 'express';
import bookRoutes from './books';

const router = Router();

router.use('/books', bookRoutes);
export default router;
