import { Request, Response } from 'express';
import { db } from '../db/connection';
import { users, addresses } from '../db/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

const updateProfileSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio").optional(),
  apellido: z.string().min(1, "El apellido es obligatorio").optional(),
  telefono: z.string().optional(),
  biografia: z.string().optional(),
});

const addAddressSchema = z.object({
  etiqueta: z.string().min(1, "La etiqueta es obligatoria"),
  calle: z.string().min(1, "La calle es obligatoria"),
  colonia: z.string().optional(),
  ciudad: z.string().min(1, "La ciudad es obligatoria"),
  estado: z.string().min(1, "El estado es obligatorio"),
  codigoPostal: z.string().min(1, "El código postal es obligatorio"),
  referencia: z.string().optional(),
});

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'No autorizado' });

    const userProfile = await db.query.users.findFirst({
      where: eq(users.id, userId),
      with: {
        addresses: true,
      }
    });

    if (!userProfile) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Excluir password_hash de la respuesta
    const { passwordHash, ...safeProfile } = userProfile;

    res.status(200).json(safeProfile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'No autorizado' });

    const validatedData = updateProfileSchema.parse(req.body);

    const [updatedUser] = await db.update(users)
      .set(validatedData)
      .where(eq(users.id, userId))
      .returning();

    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const { passwordHash, ...safeProfile } = updatedUser;
    res.status(200).json(safeProfile);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Datos inválidos', errors: error.errors });
    }
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const addAddress = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'No autorizado' });

    const validatedData = addAddressSchema.parse(req.body);

    const [newAddress] = await db.insert(addresses)
      .values({
        ...validatedData,
        userId: userId,
      })
      .returning();

    res.status(201).json(newAddress);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Datos inválidos', errors: error.errors });
    }
    console.error('Error adding address:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
