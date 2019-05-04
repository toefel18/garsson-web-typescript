export class User implements api.User {
    name: string;
    roles: string[];
    expires: Date;

    constructor(name: string, roles: string[], expires: Date) {
        this.name = name;
        this.roles = roles;
        this.expires = expires;
    }
}