import { Document } from "mongoose";

export interface admin {
    admin_name: string;
    admin_address: string;
    user_name: string;
    password: string;
}

export interface AdminModel extends Document, admin{}