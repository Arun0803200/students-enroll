import { Model, model, Schema } from "mongoose";
import { AdminModel } from "../Interface/admin.interface";

const schemaOption = {
    timestamps: {
        createdAt: "createdOn",
        updatedAt: "updatedOn",
    }
}

const adminSchema = new Schema({
    admin_name: {
        type: String,
        required: true
    },
    admin_address: {
        type: String,
        required: false
    },
    user_name: {
        type: String,
        require: true
    },
    password: {
        type: String,
        required: true
    }
}, schemaOption);

export const admin: Model<AdminModel> = model<AdminModel>('admin', adminSchema, 'admin');

