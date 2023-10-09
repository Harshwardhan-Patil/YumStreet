import { Router } from 'express';

const router = Router();

// api/users/:vendorId/menu/*
router.route('/').get();

router.route('/categories').get();

router.route('/items').post();

router.route('/items/:itemId').put().delete();

export default router;
