import express from 'express';
import {
    submitEntry,
    getPlaninfo,
    setwinner,
    getwinners,
    getusers,

    rest,
} from '../controllers/user.controller.js'; 
import { upload, handleMulterError } from '../middlewares/multer.middleware.js';

const router = express.Router();

router.get('/getuser', getusers);

router.get('/info/:amount', getPlaninfo);

router.get('/getwinners', getwinners );

router.post('/addentry', upload, handleMulterError, submitEntry);

router.put('/setwinner/:id', setwinner);



router.put('/reset', rest);

export default router;
