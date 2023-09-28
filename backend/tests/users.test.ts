import request from 'supertest';
import {
    describe,
    test,
    expect,
    beforeAll,
    afterAll
} from '@jest/globals';
import bcrypt from 'bcryptjs';
import app from '../index'; 
import User from '../models/users';


describe('User Tests', () => {
    let token: string;

    beforeAll(async () => {
        const user = new User(
            {
                username: '_',
                password: '_',
            }
        );

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();
    });

    afterAll(async () => {
        await User.deleteMany({});
        app.removeAllListeners();
    });

    test('Signup Test', async () => {
        const response = await request(app)
            .post('/api/users/signup')
            .send(
                {
                    username: '__',
                    password: '__'
                }
            );

        expect(response.status).toEqual(201);
        expect(response.body.token).toBeDefined();
    });

    test('Login Test', async () => {
        const response = await request(app)
            .post('/api/users/login')
            .send(
                {
                    username: '_',
                    password: '_'
                }
            );

        expect(response.status).toEqual(200);
        expect(response.body.token).toBeDefined();
        token = response.body.token; 
    });

    test('Logout Test', async () => {
        const response = await request(app)
            .post('/api/users/logout')
            .set('Authorization', token);

        expect(response.status).toEqual(200);
        expect(response.body.message).toEqual('Logged out.');
    });
});
