# MasFoco App

## Instrucciones de uso

1. Clona este repositorio en tu máquina local.
2. Asegúrate de tener Node.js instalado.
3. Asegúrate de tener Prisma instalado.
4. Instala las dependencias usando `npm install`.
5. Crea un archivo `.env` en la raíz del proyecto y define las siguientes variables de entorno:

PORT=3000
DATABASE_URL="mysql://root:@localhost:3306/masfocodb?schema=public"

6. Ejecuta la aplicación usando `npm start`.
7. La aplicación estará disponible en http://localhost:3000.

## Endpoints

### Obtener todos los usuarios
- Método: GET
- Ruta: /users
- Descripción: Obtiene todos los usuarios registrados en la aplicación.
- Respuesta: Un arreglo JSON con todos los usuarios.

### Obtener un usuario por ID
- Método: GET
- Ruta: /users/:id
- Descripción: Obtiene un usuario específico por su ID.
- Parámetros de URL: `id` (número) - ID del usuario.
- Respuesta: Objeto JSON que representa el usuario encontrado.

### Crear un nuevo usuario
- Método: POST
- Ruta: /users
- Descripción: Crea un nuevo usuario en la aplicación.
- Datos requeridos en el cuerpo de la solicitud:
  - `nombre` (cadena): Nombre del usuario.
  - `correo` (cadena): Correo electrónico del usuario.
  - `idOficina` (número): ID de la oficina a la que pertenece el usuario.
- Respuesta: Objeto JSON que representa el usuario creado.

### Actualizar un usuario por ID
- Método: PUT
- Ruta: /users/:id
- Descripción: Actualiza un usuario existente por su ID.
- Parámetros de URL: `id` (número) - ID del usuario a actualizar.
- Datos requeridos en el cuerpo de la solicitud:
  - `nombre` (cadena): Nuevo nombre del usuario.
  - `correo` (cadena): Nuevo correo electrónico del usuario.
  - `idOficina` (número): Nuevo ID de la oficina a la que pertenece el usuario.
- Respuesta: Objeto JSON que representa el usuario actualizado.

### Eliminar un usuario por ID
- Método: DELETE
- Ruta: /users/:id
- Descripción: Elimina un usuario específico por su ID.
- Parámetros de URL: `id` (número) - ID del usuario a eliminar.
- Respuesta: Mensaje JSON que indica que el usuario fue eliminado exitosamente.

### Obtener todos los usuarios técnicos
- Método: GET
- Ruta: /technicians
- Descripción: Obtiene todos los usuarios técnicos registrados en la aplicación.
- Respuesta: Un arreglo JSON con todos los usuarios técnicos.

### Obtener un usuario técnico por ID
- Método: GET
- Ruta: /technicians/:id
- Descripción: Obtiene un usuario técnico específico por su ID.
- Parámetros de URL: `id` (número) - ID del usuario técnico.
- Respuesta: Objeto JSON que representa el usuario técnico encontrado.

### Crear un nuevo usuario técnico
- Método: POST
- Ruta: /technicians
- Descripción: Crea un nuevo usuario técnico en la aplicación.
- Datos requeridos en el cuerpo de la solicitud:
  - `nombre` (cadena): Nombre del usuario técnico.
  - `correo` (cadena): Correo electrónico del usuario técnico.
- Respuesta: Objeto JSON que representa el usuario técnico creado.

### Eliminar un usuario técnico por ID
- Método: DELETE
- Ruta: /technicians/:id
- Descripción: Elimina un usuario técnico específico por su ID.
- Parámetros de URL: `id` (número) - ID del usuario técnico a eliminar.
- Respuesta: Mensaje JSON que indica que el usuario técnico fue eliminado exitosamente.

### Obtener todos los supervisores
- Método: GET
- Ruta: /supervisors
- Descripción: Obtiene todos los supervisores registrados en la aplicación.
- Respuesta: Un arreglo JSON con todos los supervisores.

### Obtener un supervisor por ID
- Método: GET
- Ruta: /supervisors/:id
- Descripción: Obtiene un supervisor específico por su ID.
- Parámetros de URL: `id` (número) - ID del supervisor.
- Respuesta: Objeto JSON que representa el supervisor encontrado.

### Crear un nuevo supervisor
- Método: POST
- Ruta: /supervisors
- Descripción: Crea un nuevo supervisor en la aplicación.
- Datos requeridos en el cuerpo de la solicitud:
  - `nombre` (cadena): Nombre del supervisor.
  - `correo` (cadena): Correo electrónico del supervisor.
- Respuesta: Objeto JSON que representa el supervisor creado.

### Eliminar un supervisor por ID
- Método: DELETE
- Ruta: /supervisors/:id
- Descripción: Elimina un supervisor específico por su ID.
- Parámetros de URL: `id` (número) - ID del supervisor a eliminar.
- Respuesta: Mensaje JSON que indica que el supervisor fue eliminado exitosamente.