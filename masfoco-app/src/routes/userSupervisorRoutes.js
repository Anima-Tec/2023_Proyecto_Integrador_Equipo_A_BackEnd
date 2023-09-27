import {express} from'express';
import {router} from express.Router();
import {userSupervisorController} from'../controllers/userSupervisorController';

router.get('/', userSupervisorController.getAllSupervisors);

router.get('/:id', userSupervisorController.getSupervisorById);

router.post('/', userSupervisorController.createSupervisor);

router.put('/:id', userSupervisorController.updateSupervisor);

router.delete('/:id', userSupervisorController.deleteSupervisor);

module.exports = router;
