import { JsonController, Post, Body, Res, BodyParam, Authorized, Get } from "routing-controllers";
import { UserRequest } from "../request/UserRequest";
import { adminUserModels } from "../../Models/AdminUserModel";
import { token } from "../../Models/TokenModel";
const bcrypt = require('bcrypt');
import * as jsonwebtoken from 'jsonwebtoken';
@JsonController('/admin-user')
export class UserController {

    // create user
    @Post()
    public async createUser(@Body({validate: true}) userRequest: UserRequest, @Res() response: any): Promise<any> {
        const newUser = new adminUserModels();
        const ifEmail = await adminUserModels.findOne({email: userRequest.email});
        if (ifEmail) {
            return response.status(400).send({status: 0, message: 'The given email already exists. Please try another email :)'})
        }

        const ifFindMobile = await adminUserModels.findOne({mobileNumber: userRequest.mobileNumber });
        if (ifFindMobile) {
            return response.status(400).send({status: 0, message: 'The given mobile number already exists. Please try another mobile number :)'})
        }

        if (ifEmail && ifFindMobile) {
            return response.status(400).send({status: 0, message: 'The given email and mobile number already exists. Please try another email and mobile number :)'})
        }

        const hasPassword = await bcrypt.hash(userRequest.password, 10);
        newUser.username = userRequest.email;
        newUser.password = hasPassword;
        newUser.email = userRequest.email;
        newUser.isActie = 1;
        newUser.isDelete = 0,
        newUser.firstName = userRequest.firstName;
        newUser.lastName = userRequest.lastName;
        newUser.address1 = userRequest.address1;
        newUser.address2 = userRequest.address2;
        newUser.city = userRequest.city;
        newUser.state = userRequest.state;
        newUser.country = userRequest.country;
        newUser.mobileNumber = userRequest.mobileNumber;
        const saveUSer: any = await newUser.save();
        if (saveUSer) {
            const successResponse = {
                status: 1,
                message: 'Created a new user !!',
                data: saveUSer
            }
            return response.status(200).send(successResponse)
        }
        const errorResponse = {
            status: 0,
            message: 'Unable to create a new user !!'
        }
        return response.status(400).send(errorResponse);
    }
    // login api
    @Post('/login')
    public async login(@BodyParam('username') username: string, @BodyParam('password') password: string, @Res() response: any): Promise<any> {
        const findUser: any = await adminUserModels.findOne({username: username});
        if (!findUser) {
            return response.status(400).send({status: 0, message: 'Invalid username !!'});
        }
        const comparePassword = await bcrypt.compare(password, findUser.password);
        if (!comparePassword) {
            return response.status(400).send({status: 0, message: 'Invalid password !!'});
        }
        const tokens = await jsonwebtoken.sign({userId: findUser._id, role: 'admin-user'}, 'fsha%@%xcb754wejh');
        const newToken: any = new token();
        newToken.token = token;
        newToken.isActive = 1;
        newToken.deleteFlag = 0;
        await newToken.save();

        if (token) {
            const successResponse = {
                status: 1,
                message: 'Successfully create the Token',
                token: tokens
            };
            return response.status(200).send(successResponse);
        }
        return response.status(400).send({status: 0, message: 'Invalid login !!'});
    }

    // get user list
    @Authorized()
    @Get()
    public async getUser(@Res() response: any): Promise<any> {
        const userData = await adminUserModels.find();
            const successResponse = {
                status: 1,
                message: 'Successfully get the user list !!',
                data: userData
            };
            return response.status(200).send(successResponse);
    }
}