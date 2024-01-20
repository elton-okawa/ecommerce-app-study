import { Injectable } from '@nestjs/common';
import { Cart } from '../domain';

export type CreateCartParams = {};

@Injectable()
export class CreateCart extends UseCase<CreateCartParams, Cart> {}
