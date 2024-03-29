import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { UsersModule } from './users/users.module';
import { OrderModule } from './order/order.module';
import { ChatModule } from './chat/chat.module';

export const ListModules = [UsersModule, ProductModule, AuthModule, OrderModule, ChatModule];
