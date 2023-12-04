import { Router } from 'express';
import SearchController from '../../controllers/public/SearchController.js';

const router = Router();
const Search = new SearchController();

router.get('/vendor-category', Search.SearchVendorAndCategories.bind(Search));

export default router;
