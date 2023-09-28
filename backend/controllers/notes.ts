import mongoose from 'mongoose';
import {
    Request,
    Response
} from 'express';
import Note from '../models/notes.js';


export const readNotes = async (request: Request, response: Response) => {
    try {
        const notes = await Note.find({user: request.user});
        return response.status(200)
            .json(notes)
    } catch (error: any) {
        return response.status(404)
            .json({message: error.message})
    }
}

export const createNote = async (request: Request, response: Response) => {
    const note = new Note({...request.body, user: request.user})    
    try {
        await note.save()
        return response.status(201)
            .json(note)
    } catch (error: any) {
        return response.status(409)
            .json({message: error.message})
    }
}

export const updateNote = async (request: Request, response: Response) => {
    const {id} = request.params
    const data = request.body
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(404)
            .send('Note not found.')
    }
    const note = await Note.findOneAndUpdate({_id: id, user: request.user}, { ...data }, {new: true});    
    return response.status(200)
        .json(note)
}

export const deleteNote = async (request: Request, response: Response) => {
    const {id} = request.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(404)
            .send('Note not found.')
    }
    await Note.findOneAndRemove({_id: id, user: request.user});
    return response.status(204)
        .send({})
}
