import { Injectable } from '@nestjs/common';
import { CacheService } from './cache/cache.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './database/entities/user.entity';
import { Repository } from 'typeorm';
@Injectable()
export class AppService {
  constructor(
    private readonly cacheService: CacheService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async getHello(): Promise<string> {
    console.log(await this.userRepository.count());
    const user = this.userRepository.create();
    user.email = "test@test.com"
    user.password = "123";
    user.save();
    return 'Hello World!';
  }
}
