import { Model, model, Schema } from "mongoose";
import { ChatModel } from "../Interface/Chat.interface";
export const optionalaSchma: object = {
    timestamp: {
        createdAt: "createdOn",
        updatedAt: "updatedOn"
    }
};
const chatSchema = new Schema({
    sender: {
        type: Array,
        require: true
    },
    receiver: {
        type: String,
        require: true
    },
}, optionalaSchma);

export const chat: Model<ChatModel> = model<ChatModel>('chat', chatSchema, 'chat');
