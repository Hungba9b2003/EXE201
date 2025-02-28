import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CartService } from './service/cart.service';
import { CreateCartDto } from './dto/CreateCart.dto';
import { Product } from 'src/product/schema/product.shema';

@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('')
  createCart(@Body() createCartDto: CreateCartDto) {
    return this.cartService.createCart(createCartDto);
  }

  @Get('/user/:userId')
  getAllCart(@Param('userId') userId: string) {
    return this.cartService.getCartByUserId(userId);
  }

  @Put('/user/:userId')
  deleteProductsInCart(@Body('cartId') cartId: string) {
    return this.cartService.deleteCartById(cartId);
  }
}
