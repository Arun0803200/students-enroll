import { Model, model, Schema } from "mongoose";
import { SuperAdminModel } from "../Interface/SuperAdminUser.interface";

const optionalSchema: object = {
    timestamp: {
        createdAt: 'createdOn',
        updatedAt: 'updatedAt'
    }
}

const superAdminSchema = new Schema({
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
}, optionalSchema);

export const superAdmin: Model<SuperAdminModel> = model<SuperAdminModel>('superAdminSchema', superAdminSchema, 'superAdminSchema');
