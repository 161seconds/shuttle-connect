import { Router } from 'express';
import { getPosts, getPostById, createPost, updatePostStatus } from '../controllers/postController';

const router = Router();

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', createPost);
router.patch('/:id/status', updatePostStatus);

export default router;
