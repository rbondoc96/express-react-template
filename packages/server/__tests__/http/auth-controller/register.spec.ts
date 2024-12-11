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
            email: 'user@example.com',
            first_name: 'Test',
            last_name: 'User',
            password: '#Password1234',
            password_confirmation: '#Password1234',
        });

        // Assert
        response.assertCreated();
        expect(response.header('set-cookie')).toBeTruthy();
        expect(response.header('set-cookie')).toHaveLength(1);
        expect(response.header('set-cookie')?.[0]).toContain('jwt=');
    });

    test('register with existing email', async () => {
        // Arrange
        const request = new TestRequest(server);
        const user = await new UserFactory().password('#Password1234').create();

        // Act
        const response = await request.postJson('/api/auth/register', {
            email: user.email,
            first_name: 'Test',
            last_name: 'User',
            password: '#Password1234',
            password_confirmation: '#Password1234',
        });

        // Assert
        response.assertBadRequest();
        response.assertJsonError('A user with this email already exists.');
    });

    test.each([
        [
            'first name',
            { email: 'user@example.com', last_name: 'User', password: 'password', password_confirmation: 'password' },
            { first_name: 'The first name field is required.' },
        ],
        [
            'last name',
            { email: 'user@example.com', first_name: 'User', password: 'password', password_confirmation: 'password' },
            { last_name: 'The last name field is required.' },
        ],
        [
            'email',
            { first_name: 'Test', last_name: 'User', password: 'password', password_confirmation: 'password' },
            { email: 'The email field is required.' },
        ],
        [
            'email',
            { email: 'user@example.com', first_name: 'Test', last_name: 'User' },
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
