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

  async getProductsByGender(category: string) {
    return await this.productRepository.getProductsByCategory(category);
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
    if (!filter.category) {
      products = await this.productRepository.getAll();
    } else {
      products = await this.productRepository.getProductsByCategory(
        filter.category,
      );
    }
    const totalProducts = products.length;
    const filteredProducts = products.filter((product) => {
      return (
        (filter.typeId == null || product.typeId.toString() == filter.typeId) &&
        (filter.color == null || product.color == filter.color) &&
        (filter.size == null ||
          product.sizes.some((s) => s.size === filter.size)) &&
        (filter.material == null || product.material == filter.material) &&
        (filter.pattern == null || product.pattern == filter.pattern) &&
        (filter.season == null || product.season == filter.season) &&
        (filter.waterResistance == null ||
          product.waterResistance == filter.waterResistance) &&
        (filter.closureType == null ||
          product.closureType == filter.closureType) &&
        (filter.stretch == null || product.stretch == filter.stretch)
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
    // const typeIdObject = new Types.ObjectId(createProductDto.typeId);
    const data = { ...createProductDto };
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
