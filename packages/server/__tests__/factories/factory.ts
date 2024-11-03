export abstract class Factory<S, I extends Record<string, unknown>> {
    protected abstract readonly factoryFn: (data: I) => Promise<S>;
    protected attributes: Partial<I> = {};

    public async create(): Promise<S> {
        const attributes = this.definition();

        for (const [key, value] of Object.entries(this.attributes)) {
            if (key in attributes && value !== undefined) {
                attributes[key as keyof I] = value;
            }
        }

        return await this.factoryFn(attributes);
    }

    public abstract definition(): I;
}
