const express = require('express');

const routes = express.Router();

const MovementController = require('./controllers/MovementController');
const ProfileController = require('./controllers/ProfileController');

// Movements routes
routes.get('/movements', MovementController.getAll);
routes.get('/movements/:id', MovementController.getById);
routes.post('/movements', MovementController.register);
routes.put('/movements/:id', MovementController.update);
routes.delete('/movements/:id', MovementController.delete);

// Profile routes
routes.get('/profile', ProfileController.getAll);
routes.post('/profile', ProfileController.register);
routes.put('/profile/:id', ProfileController.update);

module.exports = routes;