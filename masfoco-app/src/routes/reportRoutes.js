const express = require('express');
const router = express.Router();
const userSupervisorController = require('../controllers/userSupervisorController');

// Ruta para obtener todos los supervisores
router.get('/', userSupervisorController.getAllSupervisors);

// Ruta para obtener un supervisor por ID
router.get('/:id', userSupervisorController.getSupervisorById);

// Ruta para crear un nuevo supervisor
router.post('/', userSupervisorController.createSupervisor);

// Ruta para actualizar un supervisor por ID
router.put('/:id', userSupervisorController.updateSupervisor);

// Ruta para eliminar un supervisor por ID
router.delete('/:id', userSupervisorController.deleteSupervisor);

module.exports = router;
