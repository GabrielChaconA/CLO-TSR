# WearLab - Frontend

Este es el frontend para la tienda de ropa WearLab. Está construido utilizando **Next.js** (App Router), **TypeScript**, y **Tailwind CSS**.

## Tecnologías Principales
*   **Framework:** Next.js 16 (React 19)
*   **Estilos:** Tailwind CSS v4 con variables nativas
*   **Componentes de UI:** Radix UI (configurado mediante shadcn/ui)
*   **Iconos:** Lucide React
*   **Gestor de paquetes:** pnpm

## Estructura de Carpetas
*   `app/`: Contiene las páginas y rutas de la aplicación:
    *   `/` (raíz): Pantalla de inicio de sesión y registro de usuarios.
    *   `/inicio`: Página principal con el catálogo, hero y recomendaciones.
    *   `/buscar-diseno`: Buscador y filtros de prendas y diseños.
    *   `/subir-diseno`: Editor y configurador interactivo para subir diseños.
    *   `/mis-disenos`: Panel de usuario con sus creaciones y diseños.
    *   `/perfil`: Configuración de la cuenta del usuario.
    *   `/carrito`: Carrito de compras.
    *   `/checkout`: Formulario de envío y pago de pedidos.
*   `components/`: Componentes reutilizables de React (Navbar, Footer, ui/*).
*   `hooks/`: Custom hooks de React.
*   `lib/`: Utilidades y helpers de TypeScript.
*   `public/`: Recursos estáticos (imágenes, modelos 3D).
