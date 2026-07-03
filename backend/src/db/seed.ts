import { db } from './connection';
import { users } from './schema';
import bcrypt from 'bcryptjs';

async function seed() {
  console.log('Seeding database...');
  try {
    const defaultPassword = 'password';
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(defaultPassword, saltRounds);

    await db.insert(users).values([
      {
        email: 'juan.perez@example.com',
        passwordHash,
        nombre: 'Juan',
        apellido: 'Pérez',
        telefono: '4431234567',
        genero: 'Masculino',
        pais: 'México',
        biografia: 'Amante del diseño gráfico y la impresión textil.',
        aceptaTerminos: true,
        recibirNewsletter: true,
      },
      {
        email: 'maria.lopez@example.com',
        passwordHash,
        nombre: 'María',
        apellido: 'López',
        telefono: '5512345678',
        genero: 'Femenino',
        pais: 'México',
        biografia: 'Diseñadora freelance especializada en ilustración digital.',
        aceptaTerminos: true,
        recibirNewsletter: false,
      },
      {
        email: 'alex.torres@example.com',
        passwordHash,
        nombre: 'Alex',
        apellido: 'Torres',
        telefono: '3319876543',
        genero: 'Prefiero no decir',
        pais: 'México',
        biografia: 'Apasionado por crear diseños minimalistas para ropa personalizada.',
        aceptaTerminos: true,
        recibirNewsletter: true,
      }
    ]);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    process.exit(0);
  }
}

seed();
