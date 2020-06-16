const express = require('express');

const routes = express.Router();

const MovementController = require('./controllers/MovementController');
const ProfileController = require('./controllers/ProfileController');

const verifyValidProfile = require('./middlewares/verifyValidProfile');

// Movements routes
routes.get('/movements', verifyValidProfile, MovementController.getAll);
routes.get('/movements/:id', verifyValidProfile, MovementController.getById);
routes.post('/movements', verifyValidProfile, MovementController.register);
routes.put('/movements/:id', verifyValidProfile, MovementController.update);
routes.delete('/movements/:id', verifyValidProfile, MovementController.delete);

// Profile routes
routes.get('/profile', verifyValidProfile, ProfileController.getUser);
routes.post('/profile', ProfileController.register);
routes.post('/profile/login', ProfileController.login);
routes.delete('/profile/:id', ProfileController.delete);

module.exports = routes;