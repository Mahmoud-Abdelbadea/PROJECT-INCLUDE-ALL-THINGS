import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  Req,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import getRawBody from 'raw-body';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly stripeService: PaymentsService) {}
  @Post('checkout')
  async createCheckout(
    @Body() body //{ items: { price: string; quantity: number }[] },
  ) {
    console.log(body);
    const session = await this.stripeService.createCheckoutSession();
    console.log(session)
    return session
  }

  @Post('webhook')
  async handleWebhook(
    @Req() req: Request,
    @Headers('stripe-signature') signature: string,
  ) {
    try {
      console.log(">>>>>>>>>>>>>>>>signature",signature)
      console.log(">>>>>>>>>>>>>rawBody",req['rawBody'])
      console.log(">>>>>>>>>>>>>>>>.body",body)
      
      const event = await this.stripeService.handleWebhook(
        signature,
        req['rawBody'],
      );
      // Handle event types (e.g., payment success)
      console.log('Received event:', event.type);
      return { received: true };
    } catch (err) {
      console.error('Webhook error:', err.message);
      return { error: err.message };
    }
  }
}
