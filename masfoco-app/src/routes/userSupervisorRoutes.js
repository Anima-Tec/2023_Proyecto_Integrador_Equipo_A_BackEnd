const express = require('express');
const router = express.Router();
const userSupervisorController = require('../controllers/userSupervisorController');

// Obtener todos los supervisores
router.get('/', userSupervisorController.getAllSupervisors);

// Obtener un supervisor por ID
router.get('/:id', userSupervisorController.getSupervisorById);

// Crear un nuevo supervisor
router.post('/', userSupervisorController.createSupervisor);

// Actualizar un supervisor por ID
router.put('/:id', userSupervisorController.updateSupervisor);

// Eliminar un supervisor por ID
router.delete('/:id', userSupervisorController.deleteSupervisor);

module.exports = router;
