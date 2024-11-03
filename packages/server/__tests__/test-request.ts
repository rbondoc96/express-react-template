import request from 'supertest';
import type TestAgent from 'supertest/lib/agent';
import { type App } from 'supertest/types';
import { TestResponse } from '@tests/test-response';
import { UserSelect } from '@/database/repositories/user-repository';
import { createJwt, type CreateJwtOptions, JwtCookieMeta } from '@/utilities/auth';

export class TestRequest {
    private cookies: Record<string, string> = {};

    constructor(private readonly server: App) {
        //
    }

    private agent(): TestAgent {
        return request(this.server);
    }

    private composeCookies(): string | null {
        const cookies = Object.entries(this.cookies);

        if (cookies.length < 0) {
            return null;
        }

        const cookieTokens: string[] = [];
        for (const [key, value] of cookies) {
            cookieTokens.push(`${key}=${value}`);
        }

        return cookieTokens.join(';');
    }

    public actingAs(user: UserSelect, options?: CreateJwtOptions): this {
        const jwt = createJwt(user, options);

        this.withCookie(JwtCookieMeta.name, jwt);

        return this;
    }

    public withCookie(name: string, value: string): this {
        this.cookies[name] = value;
        return this;
    }

    public async deleteJson(url: string): Promise<TestResponse> {
        return new TestResponse(await this.agent().delete(url));
    }

    public async getJson(url: string): Promise<TestResponse> {
        const agent = this.agent().get(url);
        const cookies = this.composeCookies();

        if (cookies) {
            agent.set('Cookie', [cookies]);
        }

        return new TestResponse(await agent);
    }

    public async patchJson(url: string, body?: Record<string, unknown>): Promise<TestResponse> {
        return new TestResponse(await this.agent().patch(url).send(body).set('Accept', 'application/json'));
    }

    public async postJson(url: string, body?: Record<string, unknown>): Promise<TestResponse> {
        return new TestResponse(await this.agent().post(url).send(body).set('Accept', 'application/json'));
    }
}
