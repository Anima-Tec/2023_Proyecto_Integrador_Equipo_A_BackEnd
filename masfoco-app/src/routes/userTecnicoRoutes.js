const express = require('express');
const router = express.Router();
const userTecnicoController = require('../controllers/userTecnicoController');

// Obtener todos los usuarios técnicos
router.get('/', userTecnicoController.getAllUserTecnicos);

// Obtener un usuario técnico por ID
router.get('/:id', userTecnicoController.getUserTecnicoById);

// Crear un nuevo usuario técnico
router.post('/', userTecnicoController.createUserTecnico);

// Actualizar un usuario técnico por ID
router.put('/:id', userTecnicoController.updateUserTecnico);

// Eliminar un usuario técnico por ID
router.delete('/:id', userTecnicoController.deleteUserTecnico);

module.exports = router;
