# Sistema de Gestión de Biblioteca

Este proyecto es un sistema de gestión de biblioteca que permite administrar usuarios, libros y reservas a través de una API RESTful.

## Características principales

- Gestión de usuarios (administradores y usuarios normales)
- Gestión de libros (añadir, eliminar, actualizar)
- Sistema de reservas de libros
- Autenticación mediante JWT
- Base de datos MongoDB

## Estructura del proyecto

```
/
├── app.js                # Punto de entrada principal
├── controllers/         # Controladores de la API
├── models/              # Modelos de datos
├── routes/              # Rutas de la API
├── middlewares/         # Middlewares personalizados
├── actions/             # Utilidades
├── docker-compose.yml   # Configuración de Docker para MongoDB
└── createAdmin.js       # Script para crear administrador
```

## API

| URL | GET | POST | PATCH | DELETE |
|-----|-----|------|-----|--------|
| `/` | error | error | error | error |
| `/users` | List all users <br><br>public | Create user<br>body:<br>{<br>  username,<br>   name,<br>    email,<br> password<br>}<br><br>public | error | error |
| `/users/:_id` | One user by ID <br><br>public | error |  Update user: ID<br>body:<br>{<br>    username,<br>   name,<br>   email,<br>  password<br>}<br><br>private - Authentication \- Authorization | Delete user: ID<br><br>private - Authentication \- Authorization |
| `/users/permission` | error | Create user<br>body:<br>{<br>    username,<br>   name,<br>   email,<br>  password,<br>  Permissions<br>}<br><br>private - Authentication \- Authorization | error | error |
| `/books` | List all books <br><br>public | Create book<br>body:<br>{<br>  title,<br>    author,<br> genre,<br>   publishedYear<br>}<br><br>private - Authentication \- Authorization | error | error |
| `/books/:_id` | One book by ID <br><br>public | error | Update book: ID <br>body:<br>{<br>    title,<br>    author,<br> genre,<br>   publishedYear<br>}<br><br>private - Authentication \- Authorization| Delete book: ID<br><br>private - Authentication \- Authorization |
| `/auth/login` | error | Login user<br>body:<br>{<br>  username,<br>   password}<br><br>public| error | error |
| `/reserve` | error | Create reservation<br>body:<br>{<br> bookId<br>}<br><br>private - Authentication | error | error |

## Requisitos previos

- Node.js (v14 o superior)
- Docker y Docker Compose
- npm o yarn

## Pasos para ejecutar el proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/jcarrenoa/back-project.git
cd back-project
```

### 2. Instalar dependencias

```bash
npm install
# o
yarn install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```
MONGODB_URI=mongodb://localhost:27017/biblioteca
JWT_SECRET=tu_clave_secreta_para_jwt
PORT=3000
PEPPER=tu_pepper_secreto
```

### 4. Iniciar la base de datos MongoDB con Docker

```bash
docker-compose up -d
```

Esto iniciará un contenedor de MongoDB según la configuración del archivo `docker-compose.yml`.

### 5. Crear usuario administrador

```bash
node createAdmin.js
```

Este script creará un usuario administrador para poder gestionar el sistema.

Las credenciales de inicio de sesión son:
- username: admin
- password: admin123

### 6. Iniciar la aplicación

```bash
# En modo desarrollo
npm run dev
# o
yarn dev

# En modo producción
npm start
# o
yarn start
```

El servidor estará disponible en `http://localhost:3000` (o el puerto configurado en las variables de entorno).