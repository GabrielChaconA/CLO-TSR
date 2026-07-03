import { pgTable, serial, text, timestamp, boolean, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  nombre: text('nombre').notNull(),
  apellido: text('apellido').notNull(),
  telefono: text('telefono'),
  genero: text('genero'),
  pais: text('pais'),
  biografia: text('biografia'),
  aceptaTerminos: boolean('acepta_terminos').default(false).notNull(),
  recibirNewsletter: boolean('recibir_newsletter').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  addresses: many(addresses),
}));

export const addresses = pgTable('addresses', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  etiqueta: text('etiqueta').notNull(), // Ej: "Casa", "Oficina"
  calle: text('calle').notNull(),
  colonia: text('colonia'),
  ciudad: text('ciudad').notNull(),
  estado: text('estado').notNull(),
  codigoPostal: text('codigo_postal').notNull(),
  referencia: text('referencia'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const addressesRelations = relations(addresses, ({ one }) => ({
  user: one(users, {
    fields: [addresses.userId],
    references: [users.id],
  }),
}));
