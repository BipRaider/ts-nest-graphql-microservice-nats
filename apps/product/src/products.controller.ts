import { Controller } from '@nestjs/common';
import { ProductService } from './products.service';

@Controller()
export class ProductController {
  constructor(private readonly productsService: ProductService) {}
}
