import { describe, expect, test } from 'vitest';
import { UserFactory } from '@tests/factories/user-factory';
import { TestRequest } from '@tests/test-request';
import { server } from '@/server';

describe('login', () => {
    test('login success', async () => {
        // Arrange
        const request = new TestRequest(server);
        const user = await new UserFactory().password('#Password1234').create();

        // Act
        const response = await request.postJson('/api/auth/login', {
            username: user.username,
            password: '#Password1234',
        });

        // Assert
        response.assertOk();
        expect(response.header('set-cookie')).toBeTruthy();
        expect(response.header('set-cookie')).toHaveLength(1);

        const jwtCookie = response.header('set-cookie')?.[0];
        expect(typeof jwtCookie).toEqual('string');
        expect(jwtCookie).toContain('jwt=');
        expect(jwtCookie).toContain('Path=/;');
        expect(jwtCookie).toContain('HttpOnly;');
        expect(jwtCookie).toContain('Secure;');
        expect(jwtCookie).toContain('SameSite=None');
    });

    test('login with non existent user', async () => {
        // Arrange
        const request = new TestRequest(server);

        // Act
        const response = await request.postJson('/api/auth/login', {
            username: 'user',
            password: '#Password1234',
        });

        // Assert
        response.assertBadRequest();
        response.assertJsonError('Invalid credentials.');
    });

    test('login with incorrect password', async () => {
        // Arrange
        const request = new TestRequest(server);
        const user = await new UserFactory().password('#Password1234').create();

        // Act
        const response = await request.postJson('/api/auth/login', {
            username: user.username,
            password: 'wrong_password',
        });

        // Assert
        response.assertBadRequest();
        response.assertJsonError('Invalid credentials.');
    });
});
