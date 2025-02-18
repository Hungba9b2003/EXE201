import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CategoryRepository } from '../repository/category.repository';
import { CreateCategoryDto } from '../dto/CreateCategory.dto';
import { ObjectId } from 'mongodb';
@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async getAllCategory() {
    return await this.categoryRepository.getAll();
  }

  async getCategoryByGender(gender: string) {
    return await this.categoryRepository.findByGender(gender);
  }

  async deleteCategory(categoryId: string) {
    return await this.categoryRepository.delete(categoryId);
  }

  async updateCategory(
    categoryId: string,
    createCategoryDto: CreateCategoryDto,
  ) {
    const categoryExist = await this.categoryRepository.findById(categoryId);
  }
  async createCategory(createCategoryDto: CreateCategoryDto) {
    try {
      const menuIdObjectId = new ObjectId(createCategoryDto.menuId);
      const newMenu = { ...createCategoryDto, menuId: menuIdObjectId };
      console.log('newMenu :', newMenu);

      const Newcategory = await this.categoryRepository.create(newMenu);
      return {
        message: 'Create category success',
      };
    } catch (err) {
      console.log(err);
      throw new HttpException('Create category error', HttpStatus.BAD_REQUEST);
    }
  }
}
