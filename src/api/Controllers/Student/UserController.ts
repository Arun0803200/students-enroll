import 'reflect-metadata';
import { JsonController, Post, Body, Res } from "routing-controllers";
import { UserRequest } from "../request/UserRequest";
import {bcrypt} from 'bcrypt';
import { studentUser } from "../../Models/StudentUserModel";

@JsonController('/student-user')
export class StudentUserController {

    // create user
    @Post()
    public async createUser(@Body({validate: true}) userRequest: UserRequest, @Res() response: any): Promise<any> {
        const newUser = new studentUser();
        const ifEmail = await studentUser.findOne({email: userRequest.email});
        if (ifEmail) {
            return response.status(400).send({status: 0, message: 'The given email already exists. Please try another email :)'})
        }

        const ifFindMobile = await studentUser.findOne({mobileNumber: userRequest.mobileNumber });
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
        const saveUSer = await newUser.save();
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
}