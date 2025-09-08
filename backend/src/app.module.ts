import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, PostsModule],
  controllers: [AppController],
})
export class AppModule {}
