import Express from'express';
import {getAllReports, getReportById, createReport, updateReport, deleteReport} from '../controllers/reportController.js';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser, loginUser } from '../controllers/userController.js';
import verifyToken from "../middleware/authmddlw.js";
//import {getAllSupervisors, getSupervisorById, createSupervisor, updateSupervisor, deleteSupervisor } from'../controllers/userSupervisorController.js';
//import {getAllUserTecnicos, getUserTecnicoById, createUserTecnico, updateUserTecnico, deleteUserTecnico} from'../controllers/userTecnicoController.js';

const router = Express.Router();
router.get('/reports/', getAllReports);

router.get('/reports/:id', getReportById);

router.post('/reports/', createReport);

router.put('/reports/:id', updateReport);

router.delete('/reports/:id', deleteReport);

router.use('/reports', router);
router.get('/users', verifyToken, getAllUsers);

router.get('/users/:id', getUserById);

router.post('/signup', createUser);

router.post('/login', loginUser);

router.put('/users/:id', updateUser);

router.delete('/users/:id', deleteUser);

//router.get('/', getAllSupervisors);

//router.get('/:id', getSupervisorById);

//router.post('/', createSupervisor);

//router.put('/:id', updateSupervisor);

//router.delete('/:id', deleteSupervisor);

//router.get('/', getAllUserTecnicos);

//router.get('/:id', getUserTecnicoById);

//router.post('/', createUserTecnico);

//router.put('/:id', updateUserTecnico);

//router.delete('/:id', deleteUserTecnico);

//router.post('/signup', createUser);

//router.post('/login', loginUser);

//router.get('/protected', verifyToken, (req, res) => {
//  res.json({ message: 'Si lees esto es porque estás autenticado', userId: req.userId });
//});

export default router ;