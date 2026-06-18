"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Eye, EyeOff, User, Mail, Lock, Check } from "lucide-react"

export default function AuthPage() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // Form states
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    confirmPassword: "",
    telefono: "",
    genero: "",
    pais: "",
    biografia: "",
    aceptaTerminos: false,
    recibirNewsletter: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!isLogin) {
      // Validación nombre (required, pattern: solo letras)
      if (!formData.nombre) {
        newErrors.nombre = "El nombre es requerido"
      } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(formData.nombre)) {
        newErrors.nombre = "Solo se permiten letras"
      }

      // Validación apellido
      if (!formData.apellido) {
        newErrors.apellido = "El apellido es requerido"
      }

      // Validación teléfono (pattern: números)
      if (formData.telefono && !/^\d{10}$/.test(formData.telefono)) {
        newErrors.telefono = "Debe tener 10 dígitos"
      }

      // Validación género (required)
      if (!formData.genero) {
        newErrors.genero = "Selecciona un género"
      }

      // Validación país (required)
      if (!formData.pais) {
        newErrors.pais = "Selecciona un país"
      }

      // Validación contraseña confirmación
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Las contraseñas no coinciden"
      }

      // Validación términos (required)
      if (!formData.aceptaTerminos) {
        newErrors.aceptaTerminos = "Debes aceptar los términos"
      }
    }

    // Validación email (required, pattern: email format)
    if (!formData.email) {
      newErrors.email = "El email es requerido"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido"
    }

    // Validación contraseña (required, minlength)
    if (!formData.password) {
      newErrors.password = "La contraseña es requerida"
    } else if (formData.password.length < 8) {
      newErrors.password = "Mínimo 8 caracteres"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulación de envío (no backend)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setSubmitSuccess(true)

    // Redirigir a inicio después de 1.5 segundos
    setTimeout(() => {
      router.push("/inicio")
    }, 1500)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Limpiar error cuando el usuario escribe
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Navbar />
        <main className="mx-auto max-w-md px-4 py-20">
          <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="mb-2 text-2xl font-bold text-neutral-900">
              {isLogin ? "Inicio de sesión exitoso" : "Registro exitoso"}
            </h2>
            <p className="text-neutral-600">
              {isLogin
                ? "Bienvenido de vuelta a WearLab"
                : "Tu cuenta ha sido creada correctamente"}
            </p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />

      <main className="mx-auto max-w-xl px-4 py-12">
        {/* Toggle Login/Register */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex rounded-full bg-neutral-200 p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                isLogin
                  ? "bg-neutral-900 text-white shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                !isLogin
                  ? "bg-neutral-900 text-white shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              Registrarse
            </button>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <h1 className="mb-6 text-center text-2xl font-bold text-neutral-900">
            {isLogin ? "Bienvenido de vuelta" : "Crear una cuenta"}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Campos de Registro */}
            {!isLogin && (
              <>
                {/* Nombre y Apellido */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">
                      Nombre <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                      <Input
                        id="nombre"
                        type="text"
                        placeholder="Tu nombre"
                        required
                        pattern="^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$"
                        maxLength={30}
                        value={formData.nombre}
                        onChange={(e) => handleInputChange("nombre", e.target.value)}
                        className={`pl-10 ${errors.nombre ? "border-red-500" : ""}`}
                      />
                    </div>
                    {errors.nombre && (
                      <p className="text-xs text-red-500">{errors.nombre}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="apellido">
                      Apellido <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="apellido"
                      type="text"
                      placeholder="Tu apellido"
                      required
                      maxLength={30}
                      value={formData.apellido}
                      onChange={(e) => handleInputChange("apellido", e.target.value)}
                      className={errors.apellido ? "border-red-500" : ""}
                    />
                    {errors.apellido && (
                      <p className="text-xs text-red-500">{errors.apellido}</p>
                    )}
                  </div>
                </div>

                {/* Teléfono */}
                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input
                    id="telefono"
                    type="text"
                    placeholder="10 dígitos (ej: 5512345678)"
                    pattern="^\d{10}$"
                    maxLength={10}
                    value={formData.telefono}
                    onChange={(e) => handleInputChange("telefono", e.target.value)}
                    className={errors.telefono ? "border-red-500" : ""}
                  />
                  {errors.telefono && (
                    <p className="text-xs text-red-500">{errors.telefono}</p>
                  )}
                </div>

                {/* Género */}
                <div className="space-y-3">
                  <Label>
                    Género <span className="text-red-500">*</span>
                  </Label>
                  <RadioGroup
                    value={formData.genero}
                    onValueChange={(value) => handleInputChange("genero", value)}
                    className="flex flex-wrap gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="masculino" id="masculino" />
                      <Label htmlFor="masculino" className="font-normal">
                        Masculino
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="femenino" id="femenino" />
                      <Label htmlFor="femenino" className="font-normal">
                        Femenino
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="otro" id="otro" />
                      <Label htmlFor="otro" className="font-normal">
                        Otro
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="prefiero-no-decir" id="prefiero-no-decir" />
                      <Label htmlFor="prefiero-no-decir" className="font-normal">
                        Prefiero no decir
                      </Label>
                    </div>
                  </RadioGroup>
                  {errors.genero && (
                    <p className="text-xs text-red-500">{errors.genero}</p>
                  )}
                </div>

                {/* País */}
                <div className="space-y-2">
                  <Label>
                    País <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.pais}
                    onValueChange={(value) => handleInputChange("pais", value)}
                  >
                    <SelectTrigger className={errors.pais ? "border-red-500" : ""}>
                      <SelectValue placeholder="Selecciona tu país" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mexico">México</SelectItem>
                      <SelectItem value="colombia">Colombia</SelectItem>
                      <SelectItem value="argentina">Argentina</SelectItem>
                      <SelectItem value="chile">Chile</SelectItem>
                      <SelectItem value="peru">Perú</SelectItem>
                      <SelectItem value="espana">España</SelectItem>
                      <SelectItem value="estados-unidos">Estados Unidos</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.pais && (
                    <p className="text-xs text-red-500">{errors.pais}</p>
                  )}
                </div>

                {/* Biografía */}
                <div className="space-y-2">
                  <Label htmlFor="biografia">Cuéntanos sobre ti</Label>
                  <Textarea
                    id="biografia"
                    placeholder="Escribe una breve descripción sobre ti y tus intereses en diseño..."
                    maxLength={500}
                    rows={3}
                    value={formData.biografia}
                    onChange={(e) => handleInputChange("biografia", e.target.value)}
                    className="resize-none"
                  />
                  <p className="text-right text-xs text-neutral-500">
                    {formData.biografia.length}/500 caracteres
                  </p>
                </div>
              </>
            )}

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">
                Correo electrónico <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">
                Contraseña <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Mínimo 8 caracteres"
                  required
                  minLength={8}
                  maxLength={50}
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className={`pl-10 pr-10 ${errors.password ? "border-red-500" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Confirmar Password */}
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">
                  Confirmar contraseña <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Repite tu contraseña"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
                    className={`pl-10 pr-10 ${
                      errors.confirmPassword ? "border-red-500" : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs text-red-500">{errors.confirmPassword}</p>
                )}
              </div>
            )}

            {/* Checkboxes */}
            {!isLogin && (
              <div className="space-y-3 rounded-xl bg-neutral-50 p-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="terminos"
                    checked={formData.aceptaTerminos}
                    onCheckedChange={(checked) =>
                      handleInputChange("aceptaTerminos", checked as boolean)
                    }
                    className={errors.aceptaTerminos ? "border-red-500" : ""}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="terminos" className="font-normal leading-tight">
                      Acepto los{" "}
                      <a href="#" className="text-neutral-900 underline">
                        términos y condiciones
                      </a>{" "}
                      y la{" "}
                      <a href="#" className="text-neutral-900 underline">
                        política de privacidad
                      </a>{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    {errors.aceptaTerminos && (
                      <p className="text-xs text-red-500">{errors.aceptaTerminos}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="newsletter"
                    checked={formData.recibirNewsletter}
                    onCheckedChange={(checked) =>
                      handleInputChange("recibirNewsletter", checked as boolean)
                    }
                  />
                  <Label htmlFor="newsletter" className="font-normal leading-tight">
                    Quiero recibir novedades, promociones y tendencias de diseño
                  </Label>
                </div>
              </div>
            )}

            {/* Recordarme */}
            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="recordar" />
                  <Label htmlFor="recordar" className="font-normal">
                    Recordarme
                  </Label>
                </div>
                <a href="#" className="text-sm text-neutral-600 hover:text-neutral-900 hover:underline">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-neutral-900 py-6 text-base font-medium hover:bg-neutral-800"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="h-5 w-5 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Procesando...
                </span>
              ) : isLogin ? (
                "Iniciar Sesión"
              ) : (
                "Crear Cuenta"
              )}
            </Button>
          </form>

          {/* Toggle Link */}
          <p className="mt-6 text-center text-sm text-neutral-600">
            {isLogin ? "¿No tienes cuenta? " : "¿Ya tienes cuenta? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-medium text-neutral-900 hover:underline"
            >
              {isLogin ? "Regístrate aquí" : "Inicia sesión"}
            </button>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
