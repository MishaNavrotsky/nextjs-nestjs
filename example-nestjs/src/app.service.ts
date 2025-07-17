import { Injectable } from '@nestjs/common';
import { CacheService } from './cache/cache.service';
@Injectable()
export class AppService {
  constructor(private readonly cacheService: CacheService) { }

  async getHello(): Promise<string> {
    const v = await this.cacheService.get('w');
    const s = await this.cacheService.get('s');
    const j = await this.cacheService.get('j');

    console.log(typeof v, typeof s, typeof j);
    return 'Hello World!' + v;
  }
}
