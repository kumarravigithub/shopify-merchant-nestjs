import { Injectable } from '@nestjs/common';

const shops = {};

@Injectable()
export class ShopifyService {
  getAuthPath(shop: string): string | boolean {

    if (typeof shops[shop] !== 'undefined') {
      return false;
    } else {
      return `/shopify/auth?shop=${shop}`;
    }
  }

}
