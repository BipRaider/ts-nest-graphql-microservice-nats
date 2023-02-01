
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum Roles {
    USER = "USER",
    ADMIN = "ADMIN"
}

export interface GetUserInput {
    id?: Nullable<ObjectID>;
    email?: Nullable<string>;
}

export interface GetUsersInput {
    skip?: Nullable<number>;
    limit?: Nullable<number>;
}

export interface CreateUserInput {
    name: string;
    email: string;
    password: string;
    privateData?: Nullable<PrivateDataInput>;
}

export interface PrivateDataInput {
    firstname?: Nullable<string>;
    lastname?: Nullable<string>;
}

export interface LoginUserInput {
    password: string;
    email: string;
}

export interface PrivateData {
    firstname?: Nullable<string>;
    lastname?: Nullable<string>;
}

export interface CreateUserResponse {
    id?: Nullable<ObjectID>;
    created?: Nullable<Date>;
    updated?: Nullable<Date>;
}

export interface GetUserResponse {
    id?: Nullable<ObjectID>;
    created?: Nullable<Date>;
    updated?: Nullable<Date>;
    name?: Nullable<string>;
    email?: Nullable<string>;
    roles?: Nullable<Roles[]>;
    privateData?: Nullable<PrivateData>;
}

export interface Auth {
    id?: Nullable<ObjectID>;
    created?: Nullable<Date>;
    updated?: Nullable<Date>;
    name?: Nullable<string>;
    email?: Nullable<string>;
    password?: Nullable<string>;
    roles?: Nullable<Roles[]>;
    privateData?: Nullable<PrivateData>;
    access_token?: Nullable<string>;
}

export interface LoginUserResponse {
    id?: Nullable<ObjectID>;
    created?: Nullable<Date>;
    updated?: Nullable<Date>;
    name?: Nullable<string>;
    email?: Nullable<string>;
    roles?: Nullable<Roles[]>;
    privateData?: Nullable<PrivateData>;
    access_token: string;
}

export interface IQuery {
    getUser(data: GetUserInput): GetUserResponse | Promise<GetUserResponse>;
    getUsers(data: GetUsersInput): GetUserResponse[] | Promise<GetUserResponse[]>;
}

export interface IMutation {
    createUser(input: CreateUserInput): CreateUserResponse | Promise<CreateUserResponse>;
    login(input: LoginUserInput): LoginUserResponse | Promise<LoginUserResponse>;
    refreshToken(): Nullable<Auth> | Promise<Nullable<Auth>>;
    logout(): boolean | Promise<boolean>;
}

export type ObjectID = unknown;
type Nullable<T> = T | null;
