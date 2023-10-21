# MasFoco App

## Instrucciones de uso

1. Clona este repositorio en tu máquina local.
2. Asegúrate de tener Node.js instalado.
3. Asegúrate de tener Prisma instalado.
4. Ve a la raíz del proyecto con `cd .\2023_Proyecto_Integrador_Equipo_A_BackEnd\masfoco-app\`.
5. Instala las dependencias usando `npm i`.
6. Asegúrate de tener el servicio mysql levantado.
7. Ve a la carpeta del prisma con `cd .\prisma\`.
8. Crea la base con `npx prisma db push`
9. Vuelve a la raíz con `cd ..`
10. Crea un archivo `.env` en la raíz del proyecto y define las siguientes variables de entorno:

DATABASE_URL="mysql://root:@localhost:3306/masfocodb?schema=public"
SECRET_KEY="topo_secretowaf89u983qjdiowac3d5c3d5c5cf"
PORT=3000

11. Ejecuta la aplicación usando `npm app.js`.
12. La aplicación estará disponible en http://localhost:3000.
