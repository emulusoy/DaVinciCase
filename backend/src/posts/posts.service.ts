import { Injectable, NotFoundException } from '@nestjs/common';

import { Post } from '../common/types';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  private posts: Post[] = [
    { id: 1, userId: 1, title: 'qui est esse', body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500' },
    { id: 2, userId: 1, title: 'eum et est occaecati', body: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour' },
    { id: 3, userId: 2, title: 'nesciunt quas odio', body: 'handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.' },
    { id: 4, userId: 3, title: 'dolorem eum magni eos body: Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident' },
  ];
  private nextId = 1000;

  findAll(): Post[] { return this.posts; }

  findOne(id: number): Post {
    const p = this.posts.find(x => x.id === id);
    if (!p) throw new NotFoundException('Post not found');
    return p;
  }

  findByUser(userId: number): Post[] {
    return this.posts.filter(p => p.userId === userId);
  }

  create(dto: CreatePostDto): Post {
    const p: Post = { id: this.nextId++, ...dto };
    this.posts.unshift(p);
    return p;
  }

  // Belirli kullanıcıya yeni post 
createForUser(userId: number, dto: { title: string; body?: string }): Post {
  const p: Post = { id: this.nextId++, userId, title: dto.title, body: dto.body };
  this.posts.unshift(p);
  return p;
}

  update(id: number, dto: UpdatePostDto): Post {
    const idx = this.posts.findIndex(x => x.id === id);
    if (idx === -1) throw new NotFoundException('Post not found');
    const prev = this.posts[idx];
    const updated: Post = {
      id: prev.id,
      userId: dto.userId ?? prev.userId,
      title: dto.title ?? prev.title,
      body: dto.body ?? prev.body,
    };
    this.posts[idx] = updated;
    return updated;
  }

  remove(id: number): void {
    const before = this.posts.length;
    this.posts = this.posts.filter(x => x.id !== id);
    if (this.posts.length === before) throw new NotFoundException('Post not found');
  }
}
