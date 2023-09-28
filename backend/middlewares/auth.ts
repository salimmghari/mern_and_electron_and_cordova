import jwt from 'jsonwebtoken';
import {
    Request, 
    Response, 
    NextFunction
} from 'express';


const auth = (request: Request, response: Response, next: NextFunction) => {
    const token = request.headers.authorization;
    try {
        const decoded = jwt.verify(token as string, process.env.JWT_SECRET_KEY as string) as {id: string};
        request.user = decoded.id;
        next();
    } catch (error: any) {
        return response.status(401)
            .json({message: error.message});
    }
}


export default auth;
