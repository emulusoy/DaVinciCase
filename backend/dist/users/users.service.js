"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
let UsersService = class UsersService {
    users = [
        { id: 1, name: 'Leanne Graham', username: 'Bret', email: 'Sincere@april.biz' },
        { id: 2, name: 'Ervin Howell', username: 'Antonette', email: 'Shanna@melissa.tv' },
        { id: 3, name: 'Clementine Bauch', username: 'Samantha', email: 'Nathan@yesenia.net' },
        { id: 4, name: 'Patricia Lebsack', username: 'Karianne', email: 'Julianne.OConner@kory.org' },
        { id: 5, name: 'Chelsey Dietrich', username: 'Kamren', email: 'Lucio_Hettinger@annie.ca' },
    ];
    nextId = 1000;
    findAll() {
        return this.users;
    }
    findOne(id) {
        const u = this.users.find(x => x.id === id);
        if (!u)
            throw new common_1.NotFoundException('User not found');
        return u;
    }
    create(dto) {
        const u = { id: this.nextId++, ...dto };
        this.users.push(u);
        return u;
    }
    update(id, dto) {
        const idx = this.users.findIndex(x => x.id === id);
        if (idx === -1)
            throw new common_1.NotFoundException('User not found');
        const prev = this.users[idx];
        const updated = {
            id: prev.id,
            name: dto.name ?? prev.name,
            username: dto.username ?? prev.username,
            email: dto.email ?? prev.email,
        };
        this.users[idx] = updated;
        return updated;
    }
    remove(id) {
        const before = this.users.length;
        this.users = this.users.filter(x => x.id !== id);
        if (this.users.length === before)
            throw new common_1.NotFoundException('User not found');
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
//# sourceMappingURL=users.service.js.map