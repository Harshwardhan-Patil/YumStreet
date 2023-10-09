import { Router } from 'express';

const router = Router();

// api/users/:vendorId/orders/*
router.route('/').get();

router.route('/:orderId').put();

router.put('/:orderId/complete');
router.put('/:orderId/cancel');

export default router;
