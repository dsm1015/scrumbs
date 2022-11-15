export class User {
    id!: string;
    username!: string;
    password?: string;
    role!: string;
}

export class Users {
    users: User[] = [];
}