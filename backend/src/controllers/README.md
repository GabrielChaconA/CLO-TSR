# Directorio: `src/controllers/`

Este directorio contiene los controladores que manejan la lógica de negocio detrás de cada endpoint. Reciben los requests, interactúan con la base de datos (u otros servicios) y envían las respuestas formateadas.

## Controladores Planificados:
*   **`auth.controller.ts`**: Manejo de inicio de sesión, registro de usuarios, renovación de tokens y autenticación.
*   **`products.controller.ts`**: Consulta, filtrado y detalle de prendas y productos disponibles.
*   **`designs.controller.ts`**: Creación, guardado, listado y publicación de diseños personalizados creados por los usuarios.
*   **`cart.controller.ts`**: Sincronización del carrito de compras de los usuarios autenticados.
*   **`checkout.controller.ts`**: Lógica para iniciar pagos, crear órdenes de compra y procesar el envío.
