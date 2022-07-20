import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShopifyController } from './shopify/shopify.controller';
import { ShopifyService } from './shopify/shopify.service';

@Module({
  imports: [],
  controllers: [AppController, ShopifyController],
  providers: [AppService, ShopifyService],
})
export class AppModule {}
