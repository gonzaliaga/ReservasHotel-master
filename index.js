const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const axios = require('axios');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const routes = require('./routes/routes');

// Configurar dotenv para cargar las variables de entorno
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const urlBase = '/api';

// Configurar CORS
app.use(cors({
  origin: '*', // Permitir todos los orígenes temporalmente para pruebas
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Permitir métodos utilizados en el proyecto
  allowedHeaders: ['Content-Type'], // Permitir solo el header Content-Type
}));

// Middleware
app.use(express.json());
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Ups! Algo salió mal');
});

// Configurar Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Configurar las rutas
app.use(urlBase, routes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = axios;
