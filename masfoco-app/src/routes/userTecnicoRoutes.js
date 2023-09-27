import {express} from'express';
import {router} from express.Router();
import {userTecnicoController} from'../controllers/userTecnicoController';

router.get('/', userTecnicoController.getAllUserTecnicos);

router.get('/:id', userTecnicoController.getUserTecnicoById);

router.post('/', userTecnicoController.createUserTecnico);

router.put('/:id', userTecnicoController.updateUserTecnico);

router.delete('/:id', userTecnicoController.deleteUserTecnico);

module.exports = router;
