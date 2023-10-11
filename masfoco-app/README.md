# MasFoco App

## Instrucciones de uso

1. Clona este repositorio en tu máquina local.
2. Asegúrate de tener Node.js instalado.
3. Asegúrate de tener Prisma instalado.
4. Ve a la raíz del proyecto con `cd .\2023_Proyecto_Integrador_Equipo_A_BackEnd\masfoco-app\`.
5. Instala las dependencias usando `npm install`.
6. Crea un archivo `.env` en la raíz del proyecto y define las siguientes variables de entorno:

PORT=3000
DATABASE_URL="mysql://root:@localhost:3306/masfocodb?schema=public"

7. Ejecuta la aplicación usando `npm start`.
8. La aplicación estará disponible en http://localhost:3000.

## Endpoints

### Obtener todos los users

- Método: GET
- Ruta: /users
- Descripción: Obtiene todos los users registrados en la aplicación.
- Respuesta: Un arreglo JSON con todos los users.

### Obtener un user por ID

- Método: GET
- Ruta: /users/:id
- Descripción: Obtiene un user específico por su ID.
- Parámetros de URL: `id` (número) - ID del user.
- Respuesta: Objeto JSON que representa el user encontrado.

### Crear un nuevo user

- Método: POST
- Ruta: /users
- Descripción: Crea un nuevo user en la aplicación.
- Datos requeridos en el cuerpo de la solicitud:
  - `name` (cadena): Nombre del user.
  - `email` (cadena): Correo electrónico del user.
  - `idOficina` (número): ID de la oficina a la que pertenece el user.
- Respuesta: Objeto JSON que representa el user creado.

### Actualizar un user por ID

- Método: PUT
- Ruta: /users/:id
- Descripción: Actualiza un user existente por su ID.
- Parámetros de URL: `id` (número) - ID del user a actualizar.
- Datos requeridos en el cuerpo de la solicitud:
  - `name` (cadena): Nuevo name del user.
  - `email` (cadena): Nuevo email electrónico del user.
  - `idOficina` (número): Nuevo ID de la oficina a la que pertenece el user.
- Respuesta: Objeto JSON que representa el user actualizado.

### Eliminar un user por ID

- Método: DELETE
- Ruta: /users/:id
- Descripción: Elimina un user específico por su ID.
- Parámetros de URL: `id` (número) - ID del user a eliminar.
- Respuesta: Mensaje JSON que indica que el user fue eliminado exitosamente.

### Obtener todos los users técnicos

- Método: GET
- Ruta: /technicians
- Descripción: Obtiene todos los users técnicos registrados en la aplicación.
- Respuesta: Un arreglo JSON con todos los users técnicos.

### Obtener un user técnico por ID

- Método: GET
- Ruta: /technicians/:id
- Descripción: Obtiene un user técnico específico por su ID.
- Parámetros de URL: `id` (número) - ID del user técnico.
- Respuesta: Objeto JSON que representa el user técnico encontrado.

### Crear un nuevo user técnico

- Método: POST
- Ruta: /technicians
- Descripción: Crea un nuevo user técnico en la aplicación.
- Datos requeridos en el cuerpo de la solicitud:
  - `name` (cadena): Nombre del user técnico.
  - `email` (cadena): Correo electrónico del user técnico.
- Respuesta: Objeto JSON que representa el user técnico creado.

### Eliminar un user técnico por ID

- Método: DELETE
- Ruta: /technicians/:id
- Descripción: Elimina un user técnico específico por su ID.
- Parámetros de URL: `id` (número) - ID del user técnico a eliminar.
- Respuesta: Mensaje JSON que indica que el user técnico fue eliminado exitosamente.

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
  - `name` (cadena): Nombre del supervisor.
  - `email` (cadena): Correo electrónico del supervisor.
- Respuesta: Objeto JSON que representa el supervisor creado.

### Eliminar un supervisor por ID

- Método: DELETE
- Ruta: /supervisors/:id
- Descripción: Elimina un supervisor específico por su ID.
- Parámetros de URL: `id` (número) - ID del supervisor a eliminar.
- Respuesta: Mensaje JSON que indica que el supervisor fue eliminado exitosamente.
