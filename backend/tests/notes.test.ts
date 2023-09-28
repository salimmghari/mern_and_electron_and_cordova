import bcrypt from 'bcryptjs';
import request from 'supertest';
import {
    describe,
    test,
    expect,
    beforeAll,
    afterAll
} from '@jest/globals';
import app from '../index'; 
import Note from '../models/notes';
import User from '../models/users';


describe('Note Tests', () => {
    let token: string;
    let note: any;
    let user: any;

    beforeAll(async () => {
        user = new User(
            {
                username: '___',
                password: '___',
            }
        );

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();

        note = new Note(
            {
                title: '_',
                body: '_',
                user: user._id
            }
        );

        await note.save();

        const response = await request(app)
            .post('/api/users/login')
            .send(
                {
                    username: '___',
                    password: '___'
                }
            );

        token = response.body.token;
    });

    afterAll(async () => {
        await Note.deleteMany({});
        await User.deleteMany({});

        app.removeAllListeners();
    });

    test('Create Note Test', async () => {
        const data = {
            title: '__',
            body: '__'
        };

        const response = await request(app)
            .post('/api/notes')
            .set('Authorization', token)
            .send(data);

        expect(response.status).toEqual(201);
        expect(response.body.title).toEqual(data.title);
        expect(response.body.body).toEqual(data.body);
    });

    test('Read Notes Test', async () => {
        const response = await request(app)
            .get('/api/notes')
            .set('Authorization', token);
    
        expect(response.status).toEqual(200);
        expect(response.body[0].title).toEqual('_'); 
        expect(response.body[0].body).toEqual('_'); 
    });
    
    test('Update Note Test', async () => {
        const data = {
            title: '___',
            body: '___',
        };

        const response = await request(app)
            .put(`/api/notes/${note._id}`)
            .set('Authorization', token)
            .send(data);

        expect(response.status).toEqual(200);
        expect(response.body.title).toEqual(data.title);
        expect(response.body.body).toEqual(data.body);
    });

    test('Delete Note Test', async () => {
        const response = await request(app)
            .delete(`/api/notes/${note._id}`)
            .set('Authorization', token);

        expect(response.status).toEqual(204);
    });
});
