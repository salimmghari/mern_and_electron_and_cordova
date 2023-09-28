import mongoose from 'mongoose';


export interface IUser {
    _id: string;
    username: string;
    password: string;
    createdAt: Date;
}


export const userSchema = new mongoose.Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
});

const User = mongoose.model<IUser>('users', userSchema);


export default User;
