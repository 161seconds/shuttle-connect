import { Router } from 'express';
import postRoutes from './postRoutes';
import parseRoutes from './parseRoutes';

const router = Router();

router.use('/posts', postRoutes);
router.use('/parse', parseRoutes);

// Define your routes here
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'API is healthy' });
});

export default router;
