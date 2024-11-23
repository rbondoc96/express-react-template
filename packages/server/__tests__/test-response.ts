import { type Response } from 'supertest';
import { expect } from 'vitest';

export class TestResponse {
    constructor(private readonly response: Response) {
        //
    }

    public header(name: string): string | string[] | undefined {
        return this.headers()[name];
    }

    public headers(): Record<string, string | string[] | undefined> {
        return this.response.headers;
    }

    public assertJsonData(data: Record<string, unknown> | Array<Record<string, unknown>>): void {
        expect(this.response.body.data).toBeTruthy();
        expect(this.response.body.data).toStrictEqual(data);
    }

    public assertJsonError(message: string): void {
        expect(this.response.body.message).toBeTruthy();
        expect(typeof this.response.body.message).toEqual('string');
        expect(this.response.body.message).toEqual(message);
    }

    public assertJsonErrors(errors: Record<string, string>): void {
        expect(this.response.body.messages).toBeTruthy();
        expect(typeof this.response.body.messages).toEqual('object');

        for (const [key, value] of Object.entries(errors)) {
            expect(this.response.body.messages[key]).toEqual(value);
        }
    }

    public assertOk(): void {
        expect(this.response.status).toEqual(200);
    }

    public assertCreated(): void {
        expect(this.response.status).toEqual(201);
    }

    public assertNoContent(): void {
        expect(this.response.status).toEqual(204);
    }

    public assertBadRequest(): void {
        expect(this.response.status).toEqual(400);
    }

    public assertUnauthorized(): void {
        expect(this.response.status).toEqual(401);
    }

    public assertForbidden(): void {
        expect(this.response.status).toEqual(403);
    }

    public assertNotFound(): void {
        expect(this.response.status).toEqual(404);
    }

    public assertUnprocessable(): void {
        expect(this.response.status).toEqual(422);
    }

    public assertServerError(): void {
        expect(this.response.status).toEqual(500);
    }
}
