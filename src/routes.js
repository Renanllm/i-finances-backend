const express = require('express');

const routes = express.Router();

const MovementController = require('./controllers/MovementController');

// Transactions routes
routes.get('/movements', MovementController.getAll);
routes.get('/movements/:id', MovementController.getById);
routes.post('/movements', MovementController.register);
routes.put('/movements/:id', MovementController.update);
routes.delete('/movements/:id', MovementController.delete);

module.exports = routes;