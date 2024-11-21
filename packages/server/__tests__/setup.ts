import { afterEach, beforeEach } from 'vitest';

import { TestMigrator } from './test-migrator';

const migrator = new TestMigrator();

beforeEach(async () => {
    await migrator.start();
});

afterEach(async () => {
    await migrator.killDatabase();
});
