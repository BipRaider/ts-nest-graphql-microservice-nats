import { FactoryProvider, DynamicModule } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  Transport,
  ClientProxyFactory,
  ClientsModuleOptions,
  ClientsModule,
  NatsOptions,
} from '@nestjs/microservices';

type NatsDefaultOptions = NatsOptions['options'];
export type NatsClientOptions = NatsDefaultOptions & {
  /**Name service for listen. */
  queue: string;
};

/*** Connecting to `Nats` and working with microservice.
 *
 * ```ts
 * const app = await NestFactory.createMicroservice<MicroserviceOptions>(UserModule, NatsClient({queue: 'user'}));
 * ```
 */
export type NatsClient = (options: NatsClientOptions) => NatsOptions;
export const NatsClient: NatsClient = (options): NatsOptions => {
  const servicesUrl = ['nats://nats:4222'];
  const { queue, servers, headers } = options;
  if (typeof servers === 'string') servicesUrl.push(servers);
  if (Array.isArray(servers)) servicesUrl.push(...servers);
  if ('NATS_URL' in process.env) servicesUrl.push(process.env.NATS_URL);
  return {
    transport: Transport.NATS,
    options: {
      ...options,
      queue,
      servers: servicesUrl,
      headers: { 'x-version': '1.0.0', ...headers },
    },
  };
};

export interface IListServiceName extends NatsDefaultOptions {
  name: string;
  queue: string;
}

type listNatsServices = (list: IListServiceName[]) => ClientsModuleOptions;
const listNatsServices: listNatsServices = list => {
  return list.map(({ name, ...data }: IListServiceName) => {
    return {
      name,
      ...NatsClient(data),
    };
  });
};

/*** Send data to the listening thread.
 * ```ts
 * NatsProvider({ provide: 'USER_SERVICE', queue: 'user' })
 * ```
 */
export type NatsProvider = (
  options: { provide: string; queue: string } & NatsDefaultOptions,
) => FactoryProvider;
export const NatsProvider: NatsProvider = ({ provide, ...options }): FactoryProvider => {
  return {
    provide: provide.toUpperCase(),
    useFactory: () => ClientProxyFactory.create(NatsClient(options)),
  };
};

/*** Listening to multiple services.
 * ```ts
 *  NatsModule([{ name: 'API_SERVICE', queue: 'api'}])
 * ```
 */
export type NatsModule = (list: IListServiceName[]) => DynamicModule;
export const NatsModule: NatsModule = (list: IListServiceName[]): DynamicModule =>
  ClientsModule.register(listNatsServices(list));

/*** App `Nats` microservice.
 * ```ts
 * const app = await NatsMicroservice(UserModule, { queue: 'user' });
 * ```
 */
export const NatsMicroservice = async (module: any, options: NatsClientOptions) => {
  return await NestFactory.createMicroservice<NatsOptions>(module, NatsClient(options));
};
