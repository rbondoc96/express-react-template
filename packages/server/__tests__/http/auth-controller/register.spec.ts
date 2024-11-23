import { describe, expect, test } from 'vitest';
import { UserFactory } from '@tests/factories/user-factory';
import { TestRequest } from '@tests/test-request';
import { server } from '@/server';

describe('register', () => {
    test('register success', async () => {
        // Arrange
        const request = new TestRequest(server);

        // Act
        const response = await request.postJson('/api/auth/register', {
            first_name: 'Test',
            last_name: 'User',
            username: 'user',
            password: '#Password1234',
        });

        // Assert
        response.assertCreated();
        expect(response.header('set-cookie')).toBeTruthy();
        expect(response.header('set-cookie')).toHaveLength(1);
        expect(response.header('set-cookie')?.[0]).toContain('jwt=');
    });

    test('register with existing username', async () => {
        // Arrange
        const request = new TestRequest(server);
        const user = await new UserFactory().password('#Password1234').create();

        // Act
        const response = await request.postJson('/api/auth/register', {
            first_name: 'Test',
            last_name: 'User',
            username: user.username,
            password: '#Password1234',
        });

        // Assert
        response.assertBadRequest();
        response.assertJsonError('A user with this username already exists.');
    });

    test.each([
        [
            'first name',
            { last_name: 'User', username: 'user', password: 'password' },
            { first_name: 'The first name field is required.' },
        ],
        [
            'last name',
            { first_name: 'User', username: 'user', password: 'password' },
            { last_name: 'The last name field is required.' },
        ],
        [
            'username',
            { first_name: 'Test', last_name: 'User', password: 'password' },
            { username: 'The username field is required.' },
        ],
        [
            'username',
            { first_name: 'Test', last_name: 'User', username: 'username' },
            { password: 'The password field is required.' },
        ],
    ])('register validation without %s', async (_, body, errors) => {
        // Arrange
        const request = new TestRequest(server);

        // Act
        const response = await request.postJson('/api/auth/register', body);

        // Assert
        response.assertUnprocessable();
        response.assertJsonErrors(errors);
    });
});
