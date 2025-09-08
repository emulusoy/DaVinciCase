import { Injectable, NotFoundException } from '@nestjs/common';

import { User } from '../common/types';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 1, name: 'Leanne Graham', username: 'Bret', email: 'Sincere@april.biz' },
    { id: 2, name: 'Ervin Howell', username: 'Antonette', email: 'Shanna@melissa.tv' },
    { id: 3, name: 'Clementine Bauch', username: 'Samantha', email: 'Nathan@yesenia.net' },
    { id: 4, name: 'Patricia Lebsack', username: 'Karianne', email: 'Julianne.OConner@kory.org' },
    { id: 5, name: 'Chelsey Dietrich', username: 'Kamren', email: 'Lucio_Hettinger@annie.ca' },
  ];
  private nextId = 1000;

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    const u = this.users.find(x => x.id === id);
    if (!u) throw new NotFoundException('User not found');
    return u;
  }

  create(dto: CreateUserDto): User {
    const u: User = { id: this.nextId++, ...dto };
    this.users.push(u);
    return u;
  }

  update(id: number, dto: UpdateUserDto): User {
    const idx = this.users.findIndex(x => x.id === id);
    if (idx === -1) throw new NotFoundException('User not found');
    const prev = this.users[idx];
    const updated: User = {
      id: prev.id,
      name: dto.name ?? prev.name,
      username: dto.username ?? prev.username,
      email: dto.email ?? prev.email,
    };
    this.users[idx] = updated;
    return updated;
  }

  remove(id: number): void {
    const before = this.users.length;
    this.users = this.users.filter(x => x.id !== id);
    if (this.users.length === before) throw new NotFoundException('User not found');
  }
}
