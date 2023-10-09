import { Router } from 'express';

const router = Router();

router.route('/').get().post();

router.route('/:orderId').get().put();

router.put('/:orderId/cancel');

export default router;
