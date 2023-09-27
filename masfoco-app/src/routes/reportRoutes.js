import {express} from'express';
import {router} from express.Router();
import {reportController} from '../controllers/reportController';

router.get('/', reportController.getAllReports);

router.get('/:id', reportController.getReportById);

router.post('/', reportController.createReport);

router.put('/:id', reportController.updateReport);

router.delete('/:id', reportController.deleteReport);

module.exports = router;
