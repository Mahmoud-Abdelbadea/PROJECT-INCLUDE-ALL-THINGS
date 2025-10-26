import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import getRawBody from 'raw-body';

@Injectable()
export class RawBodyMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    // Only for webhook routes
    if (req.originalUrl.startsWith('/payments/webhook')) {
      try {
        req['rawBody'] = await getRawBody(req, {
          length: req.headers['content-length'],
          limit: '10mb',
          encoding: 'utf8',
        });
      } catch (error) {
        console.error('Error parsing raw body:', error);
        req['rawBody'] = Buffer.alloc(0);
      }
    }
    next();
  }
}