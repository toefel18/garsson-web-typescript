import { api } from '../apitypes'

export class User implements api.User {
    public name: string
    public roles: string[]
    public expires: Date

    constructor(name: string, roles: string[], expires: Date) {
        this.name = name
        this.roles = roles
        this.expires = expires
    }
}
