import { Document } from "mongoose";

export interface ChatInterface {
    sender: Array<string>;
    receiver: string;
}

export interface ChatModel extends ChatInterface, Document {}