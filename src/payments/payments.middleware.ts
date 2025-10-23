import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import getRawBody from 'raw-body';

@Injectable()
export class RawBodyMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    // بس للـ webhook routes
    if (req.originalUrl.startsWith('/payments/webhook')) {
      req['rawBody'] = await getRawBody(req);
    }
    next();
  }
}