import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UploadController } from './upload.controller';
import { ProductModule } from 'src/product/product.module';
import { TypeModule } from 'src/type/type.module';
import { CheckPermissionMiddleware } from 'src/middlewares/checkPermission.middleware';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/product/schema/product.shema';

@Module({
  imports: [
    ProductModule,
    TypeModule,
    UserModule,
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]), // Import Mongoose Model
  ],
  controllers: [UploadController],
})
export class UploadModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckPermissionMiddleware)
      .forRoutes({ path: 'menus', method: RequestMethod.POST });
  }
}
