import { Router } from 'express';

const router = Router();

// url "/api/users/:userId/cart/*"
router.route('/items').get().post();

router.route('/items/:itemsId').put().delete();

router.route('/clear').delete();

export default router;
