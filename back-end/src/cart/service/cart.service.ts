import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { CartRepository } from '../repository/cart.repository';
import { CreateCartDto } from '../dto/CreateCart.dto';
import { ObjectId } from 'mongodb';
import { Cart } from './../schema/cart.shema';
import { log } from 'console';

@Injectable()
export class CartService {
  constructor(private cartRepository: CartRepository) {}

  async createCart(createCartDto: CreateCartDto) {
    try {
      const { userId, productId, quantity, size } = createCartDto;
      const userObjectId = new ObjectId(userId);
      const productObjectId = new ObjectId(productId);
      console.log(userObjectId);
      console.log(productObjectId);
      // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
      const existingCart =
        await this.cartRepository.getCartByProductIdAndUserId(
          productObjectId,
          userObjectId,
          size,
        );
      if (existingCart) {
        if (existingCart.size === size) {
          // Nếu cùng size, cập nhật số lượng
          const updatedCart = await this.cartRepository.updateCartQuantity(
            productObjectId,
            userObjectId,
            quantity,
            size,
          );
          return {
            message: 'Cart quantity updated successfully',
            cart: updatedCart,
          };
        }
      }
      console.log(existingCart);
      // Nếu không tìm thấy sản phẩm cùng size hoặc không có sản phẩm nào, thêm mới
      const newCart = await this.cartRepository.create({
        userId: userObjectId,
        productId: productObjectId,
        quantity,
        size,
      });
      return {
        message: 'Create cart success',
        cart: newCart,
      };
    } catch (err) {
      throw new HttpException(
        err.message || 'Create cart error',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getCartByUserId(userId: string) {
    try {
      const userIdObject = new Types.ObjectId(userId);
      return await this.cartRepository.getByUserId(userIdObject);
    } catch (err) {
      throw new HttpException('Invalid user ID', HttpStatus.BAD_REQUEST);
    }
  }

  async getCartByProductIdAndUserId(
    productId: string,
    userId: string,
    size: string,
  ) {
    try {
      const productObjectId = new Types.ObjectId(productId);
      const userObjectId = new Types.ObjectId(userId);
      return await this.cartRepository.getCartByProductIdAndUserId(
        productObjectId,
        userObjectId,
        size,
      );
    } catch (err) {
      throw new HttpException(
        'Invalid product or user ID',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllCarts() {
    return this.cartRepository.getAll();
  }
  async deleteCartById(CartId: string) {
    const cartIdObjectId = new Types.ObjectId(CartId);
    const cartExists = await this.cartRepository.getById(cartIdObjectId);
    if (!cartExists) {
      throw new HttpException('Cart not found', HttpStatus.NOT_FOUND);
    }
    return await this.cartRepository.deleteCartById(cartIdObjectId);
  }

  async deleteCartByProductIdAndUserId(
    productId: ObjectId,
    userId: ObjectId,
    size: string,
  ) {
    const cartExists = await this.cartRepository.getCartByProductIdAndUserId(
      productId,
      userId,
      size,
    );

    if (!cartExists) {
      throw new HttpException('Cart not found', HttpStatus.NOT_FOUND);
    }

    return await this.cartRepository.deleteCartByProductIdAndUserId(
      productId,
      userId,
      size,
    );
  }
  async deleteCartByProductIdsAndUserId(
    userId: string,
    productIds: string[],
    size: string,
  ) {
    const userIdObjectId = new ObjectId(userId);

    const productIdsObjectId = productIds.map(
      (productId) => new ObjectId(productId),
    );

    try {
      const deletePromises = productIdsObjectId.map(async (productId) => {
        try {
          await this.deleteCartByProductIdAndUserId(
            productId,
            userIdObjectId,
            size,
          );
        } catch (err) {
          throw new Error(
            `Error deleting cart for productId ${productId}: ${err.message}`,
          );
        }
      });

      await Promise.all(deletePromises);
      return {
        message: 'Delete carts successfully',
      };
    } catch (err) {
      throw new HttpException('Delete carts error', HttpStatus.BAD_REQUEST);
    }
  }
}
