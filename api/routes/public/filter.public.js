import { Router } from 'express';
import validate from '../../validators/validate.js';
import FilterController from '../../controllers/public/FilterController.js';
import FilterValidator from '../../validators/public/FilterValidator.js';

const router = Router();
const Filter = new FilterController();

router.get(
  '/',
  FilterValidator.Filter(),
  validate,
  Filter.FilterVendors.bind(Filter)
);

export default router;
