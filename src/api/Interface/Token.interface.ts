import { Document } from "mongoose";

export interface tokenInterface {
    token: string;
    isActive: number;
    deleteFlag: number;
}
export interface tokenModel extends Document, tokenInterface {}
