import mongoose from 'mongoose';


export interface INote {
    _id: string;
    title: string;
    body: string;
    createdAt: Date;
    user: mongoose.Schema.Types.ObjectId;
}


export const noteSchema = new mongoose.Schema<INote>({
    title: {
        type: String,
        required: true,
        unique: true
    },
    body: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
});

const Note = mongoose.model<INote>('notes', noteSchema);


export default Note;
