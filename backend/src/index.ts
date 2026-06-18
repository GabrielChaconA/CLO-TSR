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

// Ruta de prueba
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "WearLab API is running smoothly",
    timestamp: new Date().toISOString()
  })
})

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`)
})
