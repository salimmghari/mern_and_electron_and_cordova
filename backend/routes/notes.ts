import express from 'express';
import {
    readNotes,
    createNote,
    updateNote,
    deleteNote
} from '../controllers/notes.js';
import auth from '../middlewares/auth.js';


const router = express.Router();

router.get('/', auth, readNotes);
router.post('/', auth, createNote);
router.put('/:id', auth, updateNote);
router.delete('/:id', auth, deleteNote);

export default router;
