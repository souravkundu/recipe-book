export class User {
    constructor(public email: string, public userid: string, private $token: string, private $tokenExpirationDate: Date) { }

    get token() {
        if (!this.$token || new Date() > this.$tokenExpirationDate) {
            return null;
        }
        return this.$token;
    }
}