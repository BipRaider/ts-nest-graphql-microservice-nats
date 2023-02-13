
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

export enum ORDER_PAID {
    expectation = "expectation",
    paid = "paid",
    check = "check",
    ok = "ok",
    incomplete = "incomplete",
    mistake = "mistake",
    refund = "refund",
    no_refund = "no_refund"
}

export enum ORDER_PROCESS {
    unused = "unused",
    expectation = "expectation",
    check = "check",
    complete = "complete",
    incomplete = "incomplete",
    cancel = "cancel",
    mistake = "mistake"
}

export enum ORDER_SEND {
    unused = "unused",
    expectation = "expectation",
    check = "check",
    send = "send",
    stop = "stop",
    cancel = "cancel"
}

export enum ORDER_RECEIVE {
    unused = "unused",
    expectation = "expectation",
    check = "check",
    complete = "complete",
    exchange = "exchange",
    mistake = "mistake"
}

export enum ORDER_EXCHANGE {
    unused = "unused",
    expectation = "expectation",
    check = "check",
    ok = "ok",
    no_refund = "no_refund",
    refundable = "refundable"
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

export interface FindOrderInput {
    id?: Nullable<ObjectID>;
    codeOrder?: Nullable<string>;
}

export interface GetOrdersInput {
    customer?: Nullable<ObjectID>;
    skip?: Nullable<number>;
    limit?: Nullable<number>;
}

export interface AllOrdersInput {
    skip?: Nullable<number>;
    limit?: Nullable<number>;
    customer?: Nullable<ObjectID>;
    codeOrder?: Nullable<string>;
    price?: Nullable<number>;
    paid?: Nullable<ORDER_PAID>;
    processed?: Nullable<ORDER_PROCESS>;
    send?: Nullable<ORDER_SEND>;
    received?: Nullable<ORDER_RECEIVE>;
    exchange?: Nullable<ORDER_EXCHANGE>;
    isCancel?: Nullable<boolean>;
    isState?: Nullable<boolean>;
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

export interface UpdateUserInput {
    name?: Nullable<string>;
    password?: Nullable<string>;
    privateData?: Nullable<PrivateDataInput>;
    avatar?: Nullable<string>;
}

export interface CreateProductInput {
    name: string;
    storeId: ObjectID;
    price?: Nullable<number>;
    amount?: Nullable<number>;
    description?: Nullable<string>;
    discount?: Nullable<number>;
}

export interface UpdateProductInput {
    id: ObjectID;
    isRemove?: Nullable<boolean>;
    price?: Nullable<number>;
    amount?: Nullable<number>;
    description?: Nullable<string>;
    discount?: Nullable<number>;
}

export interface LoginUserInput {
    password: string;
    email: string;
}

export interface CreateOrderInput {
    products: ObjectID[];
}

export interface UpdateOrderInput {
    id: ObjectID;
    paid?: Nullable<ORDER_PAID>;
    processed?: Nullable<ORDER_PROCESS>;
    send?: Nullable<ORDER_SEND>;
    received?: Nullable<ORDER_RECEIVE>;
    exchange?: Nullable<ORDER_EXCHANGE>;
    isCancel?: Nullable<boolean>;
    isState?: Nullable<boolean>;
}

export interface PaidOrderInput {
    codeReceipt?: Nullable<string>;
    paidDate?: Nullable<Date>;
    customer?: Nullable<ObjectID>;
    codeOrder?: Nullable<string>;
    paid?: Nullable<ORDER_PAID>;
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

export interface UpdateProductResponse {
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

export interface UpdateUserResponse {
    id?: Nullable<ObjectID>;
    created?: Nullable<Date>;
    updated?: Nullable<Date>;
    name?: Nullable<string>;
    email?: Nullable<string>;
    roles?: Nullable<Roles[]>;
    privateData?: Nullable<PrivateData>;
}

export interface GetUsersResponse {
    id?: Nullable<ObjectID>;
    created?: Nullable<Date>;
    updated?: Nullable<Date>;
    name?: Nullable<string>;
    email?: Nullable<string>;
    roles?: Nullable<Roles[]>;
    privateData?: Nullable<PrivateData>;
}

export interface AllOrdersResponse {
    id?: Nullable<ObjectID>;
    created?: Nullable<Date>;
    updated?: Nullable<Date>;
    customer?: Nullable<ObjectID>;
    products?: Nullable<ObjectID>;
    codeOrder?: Nullable<string>;
    price?: Nullable<number>;
    paid?: Nullable<ORDER_PAID>;
    processed?: Nullable<ORDER_PROCESS>;
    send?: Nullable<ORDER_SEND>;
    received?: Nullable<ORDER_RECEIVE>;
    exchange?: Nullable<ORDER_EXCHANGE>;
    isCancel?: Nullable<boolean>;
    isState?: Nullable<boolean>;
}

export interface CreateOrderResponse {
    id?: Nullable<ObjectID>;
    created?: Nullable<Date>;
    updated?: Nullable<Date>;
    codeOrder?: Nullable<string>;
    price?: Nullable<number>;
    paid?: Nullable<ORDER_PAID>;
}

export interface FindOrderResponse {
    id?: Nullable<ObjectID>;
    created?: Nullable<Date>;
    updated?: Nullable<Date>;
    customer?: Nullable<ObjectID>;
    products?: Nullable<ObjectID>;
    codeOrder?: Nullable<string>;
    price?: Nullable<number>;
    paid?: Nullable<ORDER_PAID>;
    processed?: Nullable<ORDER_PROCESS>;
    send?: Nullable<ORDER_SEND>;
    received?: Nullable<ORDER_RECEIVE>;
    exchange?: Nullable<ORDER_EXCHANGE>;
    isCancel?: Nullable<boolean>;
    isState?: Nullable<boolean>;
}

export interface GetOrdersResponse {
    id?: Nullable<ObjectID>;
    created?: Nullable<Date>;
    updated?: Nullable<Date>;
    customer?: Nullable<ObjectID>;
    products?: Nullable<ObjectID>;
    codeOrder?: Nullable<string>;
    price?: Nullable<number>;
    paid?: Nullable<ORDER_PAID>;
    processed?: Nullable<ORDER_PROCESS>;
    send?: Nullable<ORDER_SEND>;
    received?: Nullable<ORDER_RECEIVE>;
    exchange?: Nullable<ORDER_EXCHANGE>;
    isCancel?: Nullable<boolean>;
    isState?: Nullable<boolean>;
}

export interface PaidOrderResponse {
    id?: Nullable<ObjectID>;
    created?: Nullable<Date>;
    updated?: Nullable<Date>;
    customer?: Nullable<ObjectID>;
    products?: Nullable<ObjectID>;
    codeOrder?: Nullable<string>;
    price?: Nullable<number>;
    paid?: Nullable<ORDER_PAID>;
    processed?: Nullable<ORDER_PROCESS>;
    send?: Nullable<ORDER_SEND>;
    received?: Nullable<ORDER_RECEIVE>;
    exchange?: Nullable<ORDER_EXCHANGE>;
    isCancel?: Nullable<boolean>;
    isState?: Nullable<boolean>;
}

export interface UpdateOrderResponse {
    id?: Nullable<ObjectID>;
    created?: Nullable<Date>;
    updated?: Nullable<Date>;
    customer?: Nullable<ObjectID>;
    products?: Nullable<ObjectID>;
    codeOrder?: Nullable<string>;
    price?: Nullable<number>;
    paid?: Nullable<ORDER_PAID>;
    processed?: Nullable<ORDER_PROCESS>;
    send?: Nullable<ORDER_SEND>;
    received?: Nullable<ORDER_RECEIVE>;
    exchange?: Nullable<ORDER_EXCHANGE>;
    isCancel?: Nullable<boolean>;
    isState?: Nullable<boolean>;
}

export interface IQuery {
    getUser(input: GetUserInput): GetUserResponse | Promise<GetUserResponse>;
    getUsers(input: GetUsersInput): GetUsersResponse[] | Promise<GetUsersResponse[]>;
    findProduct(data: FindProductInput): FindProductResponse | Promise<FindProductResponse>;
    getProducts(data: GetProductsInput): GetProductsResponse[] | Promise<GetProductsResponse[]>;
    allProducts(data: AllProductsInput): AllProductsResponse[] | Promise<AllProductsResponse[]>;
    gitHubAuth(input: SocialAuthInput): string | Promise<string>;
    redditAuth(input: SocialAuthInput): string | Promise<string>;
    googleAuth(input: SocialAuthInput): string | Promise<string>;
    getGoogleAuthURL(): string | Promise<string>;
    findOrder(input: FindOrderInput): FindOrderResponse | Promise<FindOrderResponse>;
    getOrders(input: GetOrdersInput): GetOrdersResponse[] | Promise<GetOrdersResponse[]>;
    allOrders(input: AllOrdersInput): AllOrdersResponse[] | Promise<AllOrdersResponse[]>;
}

export interface IMutation {
    createUser(input: CreateUserInput): CreateUserResponse | Promise<CreateUserResponse>;
    updateUser(input: UpdateUserInput): UpdateUserResponse | Promise<UpdateUserResponse>;
    createProduct(input: CreateProductInput): CreateProductResponse | Promise<CreateProductResponse>;
    updateProduct(input: UpdateProductInput): UpdateProductResponse | Promise<UpdateProductResponse>;
    login(input: LoginUserInput): LoginUserResponse | Promise<LoginUserResponse>;
    refreshToken(): Nullable<RefreshTokenResponse> | Promise<Nullable<RefreshTokenResponse>>;
    logout(): boolean | Promise<boolean>;
    createOrder(input: CreateOrderInput): CreateOrderResponse | Promise<CreateOrderResponse>;
    updateOrder(input: UpdateOrderInput): UpdateOrderResponse | Promise<UpdateOrderResponse>;
    updateOrderPaid(input: PaidOrderInput): PaidOrderResponse | Promise<PaidOrderResponse>;
}

export type ObjectID = unknown;
type Nullable<T> = T | null;
