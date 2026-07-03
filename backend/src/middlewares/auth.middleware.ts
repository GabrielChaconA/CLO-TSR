import { Request, Response, NextFunction } from 'express';

// Extendemos la interfaz Request de Express para incluir al usuario
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
      };
    }
  }
}

export const mockAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Simulación: asume que el usuario autenticado tiene el ID 1 (Juan Pérez en nuestro seeder)
  req.user = { id: 1 };
  
  // Imprimir advertencia en consola para recordar que esto es un mock temporal
  console.log('[AUTH MOCK] Usuario simulado con ID:', req.user.id);
  
  next();
};
