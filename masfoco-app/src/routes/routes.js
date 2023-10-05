import Express from'express';
import {getAllReports, getReportById, createReport, updateReport, deleteReport} from '../controllers/reportController.js';
import {getAllUsers, getUserById, createUser, updateUser, deleteUser} from'../controllers/userController.js';
import {getAllSupervisors, getSupervisorById, createSupervisor, updateSupervisor, deleteSupervisor } from'../controllers/userSupervisorController.js';
import {getAllUserTecnicos, getUserTecnicoById, createUserTecnico, updateUserTecnico, deleteUserTecnico} from'../controllers/userTecnicoController.js';

const router = Express.Router();
router.get('/', getAllReports);

router.get('/:id', getReportById);

router.post('/', createReport);

router.put('/:id', updateReport);

router.delete('/:id', deleteReport);

router.use('/reports', router);

router.get('/', getAllUsers);

router.get('/:id', getUserById);

router.post('/', createUser);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

router.get('/', getAllSupervisors);

router.get('/:id', getSupervisorById);

router.post('/', createSupervisor);

router.put('/:id', updateSupervisor);

router.delete('/:id', deleteSupervisor);

router.get('/', getAllUserTecnicos);

router.get('/:id', getUserTecnicoById);

router.post('/', createUserTecnico);

router.put('/:id', updateUserTecnico);

router.delete('/:id', deleteUserTecnico);

export default router ;