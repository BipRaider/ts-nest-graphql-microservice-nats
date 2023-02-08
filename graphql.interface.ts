
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum Roles {
    USER = "USER",
    SELLER = "SELLER",
    MANAGER = "MANAGER",
    MERCHANT = "MERCHANT",
    MODERATO = "MODERATO",
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

export interface FindProductInput {
    id: ObjectID;
}

export interface GetProductsInput {
    userId?: Nullable<ObjectID>;
    storeId?: Nullable<string>;
    skip?: Nullable<number>;
    limit?: Nullable<number>;
}

export interface AllProductsInput {
    skip?: Nullable<number>;
    limit?: Nullable<number>;
    isRemove?: Nullable<boolean>;
    userId?: Nullable<ObjectID>;
    storeId?: Nullable<ObjectID>;
    price?: Nullable<number>;
    amount?: Nullable<number>;
    description?: Nullable<string>;
    discount?: Nullable<number>;
    name?: Nullable<string>;
}

export interface SocialAuthInput {
    code?: Nullable<string>;
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

export interface CreateProductInput {
    userId: ObjectID;
    storeId: ObjectID;
    price?: Nullable<number>;
    amount?: Nullable<number>;
    description?: Nullable<string>;
    discount?: Nullable<number>;
    name?: Nullable<string>;
}

export interface LoginUserInput {
    password: string;
    email: string;
}

export interface PrivateData {
    firstname?: Nullable<string>;
    lastname?: Nullable<string>;
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

export interface RefreshTokenResponse {
    id?: Nullable<ObjectID>;
    email?: Nullable<string>;
    roles?: Nullable<Roles[]>;
    access_token?: Nullable<string>;
}

export interface AllProductsResponse {
    id?: Nullable<ObjectID>;
    created?: Nullable<Date>;
    updated?: Nullable<Date>;
    userId?: Nullable<ObjectID>;
    storeId?: Nullable<ObjectID>;
    price?: Nullable<number>;
    amount?: Nullable<number>;
    discount?: Nullable<number>;
    description?: Nullable<string>;
    name?: Nullable<string>;
    isRemove?: Nullable<boolean>;
}

export interface CreateProductResponse {
    id?: Nullable<ObjectID>;
    created?: Nullable<Date>;
    updated?: Nullable<Date>;
}

export interface FindProductResponse {
    id?: Nullable<ObjectID>;
    created?: Nullable<Date>;
    updated?: Nullable<Date>;
    userId?: Nullable<ObjectID>;
    storeId?: Nullable<ObjectID>;
    price?: Nullable<number>;
    amount?: Nullable<number>;
    discount?: Nullable<number>;
    description?: Nullable<string>;
    name?: Nullable<string>;
    isRemove?: Nullable<boolean>;
}

export interface GetProductsResponse {
    id?: Nullable<ObjectID>;
    created?: Nullable<Date>;
    updated?: Nullable<Date>;
    userId?: Nullable<ObjectID>;
    storeId?: Nullable<ObjectID>;
    price?: Nullable<number>;
    amount?: Nullable<number>;
    discount?: Nullable<number>;
    description?: Nullable<string>;
    name?: Nullable<string>;
    isRemove?: Nullable<boolean>;
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

export interface IQuery {
    getUser(data: GetUserInput): GetUserResponse | Promise<GetUserResponse>;
    getUsers(data: GetUsersInput): GetUserResponse[] | Promise<GetUserResponse[]>;
    findProduct(data: FindProductInput): FindProductResponse | Promise<FindProductResponse>;
    getProducts(data: GetProductsInput): GetProductsResponse[] | Promise<GetProductsResponse[]>;
    allProducts(data: AllProductsInput): AllProductsResponse[] | Promise<AllProductsResponse[]>;
    gitHubAuth(input: SocialAuthInput): string | Promise<string>;
    redditAuth(input: SocialAuthInput): string | Promise<string>;
    googleAuth(input: SocialAuthInput): string | Promise<string>;
    getGoogleAuthURL(): string | Promise<string>;
}

export interface IMutation {
    createUser(input: CreateUserInput): CreateUserResponse | Promise<CreateUserResponse>;
    createProduct(input: CreateProductInput): CreateProductResponse | Promise<CreateProductResponse>;
    login(input: LoginUserInput): LoginUserResponse | Promise<LoginUserResponse>;
    refreshToken(): Nullable<RefreshTokenResponse> | Promise<Nullable<RefreshTokenResponse>>;
    logout(): boolean | Promise<boolean>;
}

export type ObjectID = unknown;
type Nullable<T> = T | null;
