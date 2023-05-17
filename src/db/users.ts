/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-14 19:51:25
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-17 09:57:36
 */
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true},
    email: { type: String, required: true},
    authentication: { 
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false}
    },
    role: { type: String }
});

export const UserModel = mongoose.model('User', UserSchema);

export const getUsers = () => UserModel.find();
export const getUsersCount = () => UserModel.count();
export const getUserByUsername = (username: string) => UserModel.findOne( {username});
export const getUserByEmail = (email: string) => UserModel.findOne( {email});
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({
    'authentication.sessionToken': sessionToken
});
export const getUserById = (id: string) => UserModel.findById({_id: id});
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());
export const deleteUserById = (id: string) => UserModel.findOneAndDelete({_id: id});
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values); 

