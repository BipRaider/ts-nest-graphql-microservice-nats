/*** The names of the `NATS` service in system `to connect to them`. */
export enum NatsServicesName {
  API = 'API_SERVICE',
  ADMIN = 'ADMIN_SERVICE',
  USER = 'USER_SERVICE',
  PRODUCT = 'PRODUCT_SERVICE',
  ORDER = 'ORDER_SERVICE',
  STORE = 'STORE_SERVICE',
  EMAIL = 'EMAIL_SERVICE',
  CHAT = 'CHAT_SERVICE',
  EXCHEQUER = 'EXCHEQUER_SERVICE',
  SOCIAL_AUTH = 'SOCIAL_AUTH_SERVICE',
  PROFILE = 'PROFILE_SERVICE',
}

/*** The names of the `NATS` services in the system `to catching events`.*/
export enum NatsServicesQueue {
  API = 'api',
  ADMIN = 'admin',
  USER = 'user',
  PRODUCT = 'product',
  ORDER = 'order',
  EMAIL = 'email',
  CHAT = 'chat',
  STORE = 'store',
  EXCHEQUER = 'exchequer',
  SOCIAL_AUTH = 'social_auth',
  PROFILE = 'profile',
}
