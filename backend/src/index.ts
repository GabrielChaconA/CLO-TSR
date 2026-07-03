import express from "express"
import cors from "cors"
import dotenv from "dotenv"

// Cargar variables de entorno
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middlewares
app.use(cors())
app.use(express.json())

import usersRoutes from './routes/users.routes';

// Ruta de prueba
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "WearLab API is running smoothly",
    timestamp: new Date().toISOString()
  })
})

// Rutas API
app.use("/api/users", usersRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`)
})
