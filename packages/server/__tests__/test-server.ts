import request from 'supertest';
import type TestAgent from 'supertest/lib/agent';
import { type App } from 'supertest/types';
import { TestResponse } from '@tests/test-response';

export class TestServer {
    constructor(private readonly server: App) {
        //
    }

    private agent(): TestAgent {
        return request(this.server);
    }

    public async deleteJson(url: string): Promise<TestResponse> {
        return new TestResponse(await this.agent().delete(url));
    }

    public async getJson(url: string): Promise<TestResponse> {
        return new TestResponse(await this.agent().get(url));
    }

    public async patchJson(url: string, body?: Record<string, unknown>): Promise<TestResponse> {
        return new TestResponse(await this.agent().patch(url).send(body).set('Accept', 'application/json'));
    }

    public async postJson(url: string, body?: Record<string, unknown>): Promise<TestResponse> {
        return new TestResponse(await this.agent().post(url).send(body).set('Accept', 'application/json'));
    }
}
