import expess from 'express';
import { 
        getProduct, 
        getProductById, 
        updateProduct, 
        deleteProduct,
        saveProduct
} from '../controller/ProductController.js';

const router = expess.Router();

router.route('/products').get(getProduct);
router.route('/products').post(saveProduct);
router.route('/products/:id').delete(deleteProduct);
router.route('/products/:id').get(getProductById)
router.route('/products/:id').put(updateProduct)        

export default router;