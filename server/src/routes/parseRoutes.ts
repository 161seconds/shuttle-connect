import { Router } from 'express';
import { parsePost } from '../controllers/parseController';

const router = Router();

router.post('/', parsePost);

export default router;
