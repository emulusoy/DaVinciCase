import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreatePostDto } from './dto/create-post.dto';
import { CreatePostForUserDto } from './dto/createpostforuser.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';

@ApiTags('posts')
@Controller()
export class PostsController {
  constructor(private readonly posts: PostsService) {}

  @Get('posts')
  findAll() { return this.posts.findAll(); }

  @Get('posts/:id')
  findOne(@Param('id', ParseIntPipe) id: number) { return this.posts.findOne(id); }

  @Post('posts')
  create(@Body() dto: CreatePostDto) { return this.posts.create(dto); }

  @Patch('posts/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePostDto) {
    return this.posts.update(id, dto);
  }

  @Delete('posts/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    this.posts.remove(id);
    return { ok: true };
  }


//kullaniciya ait postlari guncelleme islemi once idliyi bul sonra guncelle
  @Get('users/:userId/posts')
  findByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.posts.findByUser(userId);
  }

  @Post('users/:userId/posts')
  createForUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() dto: CreatePostForUserDto
  ) {
    return this.posts.createForUser(userId, dto);
  }
}
