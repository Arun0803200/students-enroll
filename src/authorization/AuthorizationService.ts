import * as express from 'express';
const jwt = require('jsonwebtoken');
export class AuthSerice {
    constructor() {}

    public async checkingAuthorization(req: express.request): Promise<any> {
        const header = await req.headers.authorization;
        const authorization = header.split(' ');
        if (authorization[0] !== 'Bearer') {
            return undefined;
        }
        const tokenVerification = await this.tokenDecryption(authorization[1]);
        if (!tokenVerification) {
            return undefined;
        }        
        return tokenVerification
    }

    public async tokenDecryption(token): Promise<any> {
            const tokens = jwt.verify(token, 'fsha%@%xcb754wejh');
            return tokens;
    }
}
