import {Model, model, Schema} from 'mongoose';
import { StudentUserModel } from '../Interface/StudentUser.interface';
const additionalSchema: any = {
    timestamp : {
        createdAt: "createdOn",
        updatedAt: "updatedOn"
    }
};

const StudentSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    isActie: {
        type: Number,
        required: true
    },
    isDelete: {
        type: Number,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: false
    },
    address1: {
        type: String,
        required: true
    },
    address2: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: false
    },
}, additionalSchema);

export const studentUser: Model<StudentUserModel> = model<StudentUserModel>('StudentSchema', StudentSchema, 'StudentSchema');
