import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {
    Request, 
    Response
} from 'express';
import User from '../models/users';


export const signup = async (request: Request, response: Response) => {
    const user = new User(request.body);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    try {
        await user.save();
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY as string, {expiresIn: '1h'});
        return response.status(201)
            .json({token, user: user._id});
    } catch (error: any) {
        return response.status(409)
            .json({message: error.message});
    }
}

export const login = async (request: Request, response: Response) => {
    const {username, password} = request.body;
    const user = await User.findOne({username});

    if (await bcrypt.compare(password, user!.password)) {
        const token = jwt.sign({id: user!._id}, process.env.JWT_SECRET_KEY as string, {expiresIn: '1h'});
        response.cookie('jwt', token, {maxAge: 3600000});
        return response.status(200)
            .json({token});
    }
    return response.status(401)
        .json({message: 'Invalid email or password.'});
}

export const logout = (request: Request, response: Response) => {
    response.clearCookie('jwt');
    return response.status(200)
        .json({message: 'Logged out.'});
}
