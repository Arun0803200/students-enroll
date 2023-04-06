
import { Connection } from "mongoose";
import { Action } from "routing-controllers";
import { AuthSerice } from "./AuthorizationService";
import Container from "typedi";
import { adminUserModels } from "../Models/AdminUserModel";

export function authorizationChecker(connection: Connection): (action: Action, roles: string[]) => Promise<boolean> | boolean {
    const authService = Container.get<AuthSerice>(AuthSerice);
    return async function innerFunction(action: Action, roles: string[]): Promise<boolean> {
        const user = await authService.checkingAuthorization(action.request);
        if (user === undefined) {
            return false;
        }
        action.request.user = await adminUserModels.findOne({_id: user.userId});
        if (!action.request.user) {
            return false;
        }
        return true;
    }
}
