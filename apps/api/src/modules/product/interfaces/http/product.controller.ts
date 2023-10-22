import {
  Body,
  Controller,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProduct } from '../../use-cases';
import { CreateProductDTO } from './dto';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private createProduct: CreateProduct) {}

  @Post()
  async create(@Body() createProductDTO: CreateProductDTO): Promise<void> {
    const res = await this.createProduct.execute(createProductDTO);

    if (res.failed) {
      throw new UnprocessableEntityException(res.errorMessage);
    }
  }
}
