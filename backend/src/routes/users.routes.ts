import { Router } from 'express';
import { getProfile, updateProfile, addAddress } from '../controllers/users.controller';
import { mockAuthMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// Todas las rutas de usuario requieren estar autenticadas (usando nuestro mock por ahora)
router.use(mockAuthMiddleware);

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.post('/addresses', addAddress);

export default router;
