import { Model, model, Schema } from "mongoose";
import { tokenModel } from "../Interface/Token.interface";
const additionalSchema: any = {
    timestamp: {
        createdAt: 'createdOn',
        updatedAt: 'updatedOn'
    }
};

const tokenSchema = new Schema({
    token: {
        type: String,
        required: true
    },
    isActive: {
        type: Number,
        required: true
    },
    deleteFlag: {
        type: Number,
        required: true
    }
},additionalSchema);

export const token: Model<tokenModel> = model<tokenModel>('token', tokenSchema, 'token');