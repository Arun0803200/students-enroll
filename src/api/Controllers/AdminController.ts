import 'reflect-metadata'
import { JsonController, Post, Body, Res } from "routing-controllers";
// import { Service } from "typedi";
import { admin } from "../Models/adminModel";
import { AdminRequest } from "./request/AdminRequest";

// @Service()
@JsonController('/admin')
export class AdminController {
    @Post()
    public async createAdmin(@Body({validate: true}) adminRequest: AdminRequest, @Res() response: any): Promise<any> {
        const newAdmin = new admin();
        newAdmin.admin_name = adminRequest.adminName;
        newAdmin.admin_address = adminRequest.address;
        newAdmin.user_name = adminRequest.username;
        newAdmin.password = adminRequest.password;
        const result = await newAdmin.save();
        if (result) {
            const successExample = {
                status: 1,
                message: 'Successfully created the admin table',
                data: result
            };
            return response.status(200).send(successExample);
        }
        const errorExample = {
            status: 0,
            message: 'Unable to create the admin data'
        };
        return response.status(400).send(errorExample);
    }
}