export type ApplicationError = {
    name: string;
    message: string;
};

export type AuthorDB = {
    id: number,
    name: string,
    identity: string,
    country: string
};

export type Author = Omit<AuthorDB, "id">;

export type SimpleTableDB = {
    id: number,
    name: string
};

export type SimpleTableId = Omit<SimpleTableDB, "name">;
export type SimpleTable = Omit<SimpleTableDB, "id">
