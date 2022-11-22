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
