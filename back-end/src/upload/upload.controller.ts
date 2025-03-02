import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  Body,
  Delete,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { storageOptions } from 'helpers/config';
import { ProductService } from 'src/product/service/product.service';
import { TypeService } from 'src/type/service/type.service';
import { Product } from '../product/schema/product.shema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Controller('uploads')
export class UploadController {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>, // Inject đúng cách
    private readonly productService: ProductService,
    private readonly typeService: TypeService,
  ) {}
  @Post('product')
  @UseInterceptors(
    FilesInterceptor('files', 10, { storage: storageOptions('products') }),
  )
  async uploadPostFiles(
    @Body('productId') productId: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    if (!files || files.length === 0) {
      return { success: false, message: 'No files uploaded' };
    }

    // Tạo danh sách URL của ảnh đã upload
    const urlFiles = files.map((file) => ({
      url: `http://localhost:5000/api/uploads/products/${file.filename}`,
    }));

    if (productId) {
      // Nếu có productId, cập nhật ảnh cho sản phẩm
      await this.productService.updateImagesOfProduct(
        productId,
        urlFiles.map((f) => f.url),
      );

      return {
        success: true,
        message: 'Update images success',
        urls: urlFiles,
      };
    } else {
      // Nếu chưa có productId, trả về danh sách ảnh để frontend dùng khi tạo sản phẩm mới
      return {
        success: true,
        message: 'Upload success',
        urls: urlFiles,
      };
    }
  }
  @Delete('product')
  async deleteProductImage(
    @Body('productId') productId: string,
    @Body('imageUrl') imageUrl: string,
  ) {
    if (!productId || !imageUrl) {
      return { success: false, message: 'Missing productId or imageUrl' };
    }

    try {
      const product = await this.productModel.findById(productId);
      if (!product) {
        return { success: false, message: 'Product not found' };
      }
      // Xóa ảnh khỏi danh sách
      product.images = product.images.filter((img) => img !== imageUrl);
      await product.save();

      return { success: true, message: 'Image deleted successfully' };
    } catch (error) {
      console.error('Error deleting image:', error);
      return { success: false, message: 'Failed to delete image' };
    }
  }

  @Post('avatar')
  @UseInterceptors(
    FilesInterceptor('files', 1, { storage: storageOptions('avatars') }),
  )
  uploadAvatarFile(@UploadedFiles() files: Express.Multer.File[]) {
    const uploadedFiles = files.map((file) => ({
      url: `http://localhost:5000/api/uploads/avatars/${file.filename}`,
      name: file.filename,
      status: 'done',
    }));
    return uploadedFiles;
  }

  @Post('type')
  @UseInterceptors(
    FilesInterceptor('files', 1, { storage: storageOptions('types') }),
  )
  async uploadTypeFile(
    @UploadedFiles() files: Express.Multer.File[],
    @Body('typeId') typeId: string,
  ) {
    const urlFiles = files.map((file) => {
      const url = `http://localhost:5000/api/uploads/types/${file.filename}`;
      console.log('url :', url);
      return url;
    });
    return await this.typeService.updateImage(typeId, urlFiles[0]);
  }
}

// function InjectModel(name: string): (target: typeof UploadController, propertyKey: undefined, parameterIndex: 0) => void {
//   throw new Error('Function not implemented.');
// }
// }
// function Delete(arg0: string): (target: UploadController, propertyKey: "deleteProductImage", descriptor: TypedPropertyDescriptor<(productId: string, imageUrl: string) => Promise<{ success: boolean; message: string; }>>) => void | TypedPropertyDescriptor<...> {
//   throw new Error('Function not implemented.');
// }