import { faker } from '@faker-js/faker';
import { Factory } from '@tests/factories/factory';
import { UserCreate, userCreate, UserSelect } from '@/database/repositories/user-repository';

export class UserFactory extends Factory<UserSelect, UserCreate> {
    protected readonly factoryFn = userCreate;

    public definition(): UserCreate {
        return {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            username: faker.internet.username(),
            password: faker.internet.password(),
        };
    }

    public firstName(firstName: string): this {
        this.attributes.first_name = firstName;
        return this;
    }

    public lastName(lastName: string): this {
        this.attributes.last_name = lastName;
        return this;
    }

    public username(username: string): this {
        this.attributes.username = username;
        return this;
    }

    public password(password: string): this {
        this.attributes.password = password;
        return this;
    }
}
