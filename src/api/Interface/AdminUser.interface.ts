import { Document } from "mongoose";

export interface AdminUser {
    username: string;
    password: string;
    email: string;
    isActie: number;
    isDelete: number;
    firstName: string;
    lastName: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    country: string;
    mobileNumber: string;
}

export interface AdminUserModel extends Document, AdminUser {}
