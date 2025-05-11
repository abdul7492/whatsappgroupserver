import express from 'express';
import {
    submitEntry,
    getPlaninfo,
    setwinners,
    getwinners,
    rest,
} from '../controllers/user.controller.js'; 
import { upload, handleMulterError } from '../middlewares/multer.middleware.js';

const router = express.Router();

router.get('/:amount', getPlaninfo);

router.get('/getwinners', getwinners );

router.post('/addentry', upload, handleMulterError, submitEntry);

router.put('/setwinners', setwinners);

router.put('/rest', rest);

export default router;
