const express = require('express');
const router = express.Router();
const userSupervisorController = require('../controllers/userSupervisorController');

router.get('/', userSupervisorController.getAllSupervisors);

router.get('/:id', userSupervisorController.getSupervisorById);

router.post('/', userSupervisorController.createSupervisor);

router.put('/:id', userSupervisorController.updateSupervisor);

router.delete('/:id', userSupervisorController.deleteSupervisor);

module.exports = router;
