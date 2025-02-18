import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductRepository } from '../repository/product.repository';
import { CreateProductDto } from '../dto/createProduct.dto';
import { Types } from 'mongoose';
import { TypeService } from 'src/type/service/type.service';
import { Product } from '../schema/product.shema';
@Injectable()
export class ProductService {
  private readonly _limit = 16;
  constructor(
    private productRepository: ProductRepository,
    private typeService: TypeService,
  ) {}

  async getAllProducts() {
    return await this.productRepository.getAll();
  }
  async getProductById(productId: string) {
    const product = await this.productRepository.findById(productId);
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return product;
  }

  async getProductByTypeId(typeId: string) {
    console.log('typeId :', typeId);
    return await this.productRepository.getProductByTypeId(typeId);
  }

  async getProductsByGender(categoryId: string) {
    return await this.productRepository.getProductsByCategoryId(categoryId);
  }

  async updateImagesOfProduct(productId: string, urlFiles: string[]) {
    try {
      const product = await this.productRepository.findById(productId);
      console.log(product);
      if (!product) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }

      await this.productRepository.updateImagesOfProduct(productId, urlFiles);
      return {
        message: 'Update images success',
      };
    } catch (err) {
      throw new HttpException(
        'Update images error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getProductsByFilter(filter: any) {
    let products;
    if (!filter.categoryId) {
      products = await this.productRepository.getAll();
    } else {
      const types = await this.typeService.getTypesByCategoryId(
        filter.categoryId,
      );

      const typeIds = types.map((type) => type._id);

      products = await this.productRepository.getProductByTypeIds(typeIds);
    }

    const totalProducts = products.length;

    const filteredProducts = products.filter((product) => {
      return (
        (filter.typeId == null || product.typeId.toString() == filter.typeId) &&
        (filter.dialColor == null || product.dialColor == filter.dialColor) &&
        (filter.dialSize == null || product.dialSize == filter.dialSize) &&
        (filter.strapMaterial == null ||
          product.strapMaterial == filter.strapMaterial)
      );
    });

    if (filter._sort) {
      const sortOrder = filter._sort === 'asc' ? 1 : -1;
      filteredProducts.sort((a, b) => sortOrder * (a.salePrice - b.salePrice));
    }

    const result = this.getProductsByPageNumber(filteredProducts, filter._page);

    return {
      rows: result,
      totalProducts,
      page: filter._page,
    };
  }

  getProductsByPageNumber(products: Product[], _page: number) {
    let skip = (_page - 1) * this._limit;
    const result = products.slice(skip, skip + this._limit);
    return result;
  }

  async createProduct(createProductDto: CreateProductDto) {
    const typeIdObject = new Types.ObjectId(createProductDto.typeId);
    const data = { ...createProductDto, typeId: typeIdObject };
    try {
      const Newproduct = await this.productRepository.create(data);
      return {
        message: 'Create product success',
      };
    } catch (err) {
      console.log(err);
      throw new HttpException('Create product error', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteProductById(productId: string) {
    const productExist = await this.productRepository.findById(productId);
    if (!productExist) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    try {
      await this.productRepository.deleteById(productId);
      return {
        message: 'Delete product success',
      };
    } catch (err) {
      throw new HttpException(
        'Delete product error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateProductById(
    productId: string,
    updateProductDto: CreateProductDto,
  ) {
    const productExist = await this.productRepository.findById(productId);
    if (!productExist) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    try {
      await this.productRepository.updateById(productId, updateProductDto);
      return {
        message: 'update product success',
      };
    } catch (err) {
      throw new HttpException(
        'update product error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
