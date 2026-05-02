import request from 'supertest';
import mongoose from 'mongoose';
import server from '../server';

describe('Auth', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URL);
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    describe('POST /signup', () => {
        // eslint-disable-next-line arrow-body-style, jest/expect-expect
        it('creates a user', () => {
            return request(server)
                .post('/signup')
                .send({ email: 'test@test.com', password: 'testPassword' })
                .expect(201)
                .expect(res => {
                    expect(res.body).toEqual({});
                });
        });

        it('should not create a duplicate user', () => request(server)
                .post('/signup')
                .send({ email: 'test@test.com', password: 'testPassword' })
                .expect(res => {
                    expect(res.statusCode).toEqual(400);
                }));
    });
});