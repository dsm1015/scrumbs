export class User {
    _id!: string;
    username!: string;
    password?: string;
    team?: string;
    role!: string;
}

export class Users {
    users: User[] = [];
}