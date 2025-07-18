import { Injectable } from '@nestjs/common';
import { CacheService } from './cache/cache.service';
@Injectable()
export class AppService {
  constructor(private readonly cacheService: CacheService) { }

  async getHello(): Promise<string> {
    return 'Hello World!';
  }
}
