import { Controller, Get, Query, Redirect, Req, Res } from '@nestjs/common';
import Shopify from '@shopify/shopify-api';
import { Product } from '@shopify/shopify-api/dist/rest-resources/2021-10/index.js';
import { ShopifyService } from './shopify.service';

const shopSession = '';

@Controller('shopify')
export class ShopifyController {
    constructor(private readonly shopifyService: ShopifyService) { }

    @Get()
    @Redirect()
    redirectToAuth(@Req() req: Request, @Res() res: Response, @Query() query) {
        return { url: this.shopifyService.getAuthPath(query.shop) };
    }

    @Get('auth')
    @Redirect()
    async getAuth(@Req() req, @Res() res) {
        const authRoute = await Shopify.Auth.beginAuth(
            req,
            res,
            req.query.shop,
            '/shopify/auth/callback',
            false
        )
        res.redirect(authRoute);
    }
    @Get('auth/callback')
    async getAuthCallback(@Req() req, @Res() res) {
        const shopSession = await Shopify.Auth.validateAuthCallback(
            req,
            res,
            req.query
        );
        console.log(shopSession);
        const products = await Product.all({
            session: shopSession,
        });
        const sendThisTest = [products, shopSession]
        console.log(sendThisTest);
        res.send(sendThisTest);
    }

    @Get('getuser')
    async getUser(@Req() req, @Res() res) {
        const shopSession = await Shopify.Auth.validateAuthCallback(
            req,
            res,
            req.query
        );
        console.log(shopSession);
        res.send(shopSession);
    }
}
