import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigModule } from '@nestjs/config';
import { Shopify, ApiVersion } from '@shopify/shopify-api';

ConfigModule.forRoot();
const { SHOPIFY_API_KEY, SHOPIFY_API_SECRET, SHOPIFY_API_SCOPES,
  HOST } = process.env;

Shopify.Context.initialize({
  API_KEY: SHOPIFY_API_KEY,
  API_SECRET_KEY: SHOPIFY_API_SECRET,
  SCOPES: [SHOPIFY_API_SCOPES],
  HOST_NAME: HOST,
  IS_EMBEDDED_APP: false,
  API_VERSION: ApiVersion.October21
})

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT);
}
bootstrap();
