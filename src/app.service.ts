import { Injectable, Logger } from '@nestjs/common';
console.log('AppService');

@Injectable()
export class AppService {
  constructor() {
    Logger.debug('AppService constructor', 'AppService');
    // ('AppService constructor', 'AppService');
    // console.log('AppService constructor');
  }
  getHello(): string {
    Logger.debug('AppService getHello', 'AppService');
    // console.log('AppService getHello');
    return 'Hello World!';
  }
}
