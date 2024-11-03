import { DateTime } from 'luxon';
import { describe, test } from 'vitest';
import { UserFactory } from '@tests/factories/user-factory';
import { TestRequest } from '@tests/test-request';
import { userDelete } from '@/database/repositories/user-repository';
import { UserResource } from '@/http/resources/user-resource';
import { server } from '@/server';

describe('me', () => {
    test('me success', async () => {
        // Arrange
        const request = new TestRequest(server);
        const user = await new UserFactory().create();

        // Act
        const response = await request.actingAs(user).getJson('/api/auth');

        // Assert
        const resource = new UserResource(user).base().create();

        response.assertOk();
        response.assertJsonData(resource.data);
    });

    test('me fails when not authenticated', async () => {
        // Arrange
        const request = new TestRequest(server);

        // Act
        const response = await request.getJson('/api/auth');

        // Assert
        response.assertUnauthorized();
    });

    test('me fails when jwt is expired', async () => {
        // Arrange
        const user = await new UserFactory().create();
        const request = new TestRequest(server);
        request.actingAs(user, {
            iat: DateTime.now().minus({ days: 1, minutes: 1 }),
        });

        // Act
        const response = await request.getJson('/api/auth');

        // Assert
        response.assertUnauthorized();
    });

    test('me fails when user does not exist', async () => {
        // Arrange
        const user = await new UserFactory().create();
        const request = new TestRequest(server);
        request.actingAs(user);

        await userDelete(user.ulid);

        // Act
        const response = await request.getJson('/api/auth');

        // Assert
        response.assertUnauthorized();
    });
});
