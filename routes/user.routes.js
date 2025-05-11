import express from 'express';
import {
    submitEntry,
    getPlaninfo,
    setwinner,
    getwinners,
    deleteUser,
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

router.delete('/delete/:id', deleteUser);

router.put('/reset', rest);

export default router;
