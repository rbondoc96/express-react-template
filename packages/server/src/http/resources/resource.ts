type Pagination = {
    current_page: number;
    final_page: number;
    per_page: number;
    total: number;
};

export class Resource<T> {
    protected _formatter: undefined | ((data: T) => Record<string, unknown>);
    protected _pagination: Pagination | undefined;

    constructor(protected readonly resource: T | T[]) {
        //
    }

    public pagination(count: number, query: { page: number; per_page: number }): this {
        this._pagination = {
            current_page: query.page,
            final_page: Math.ceil(count / query.per_page),
            per_page: query.per_page,
            total: count,
        };
        return this;
    }

    public create(): Record<string, unknown> | Array<Record<string, unknown>> {
        if (!this._formatter) {
            throw new Error('No format specified.');
        }

        const data = Array.isArray(this.resource) ? this.resource.map(this._formatter) : this._formatter(this.resource);

        return {
            success: true,
            meta: this._pagination,
            data,
        };
    }
}
