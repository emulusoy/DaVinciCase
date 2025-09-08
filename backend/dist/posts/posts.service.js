"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
let PostsService = class PostsService {
    posts = [
        { id: 1, userId: 1, title: 'qui est esse', body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500' },
        { id: 2, userId: 1, title: 'eum et est occaecati', body: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour' },
        { id: 3, userId: 2, title: 'nesciunt quas odio', body: 'handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.' },
        { id: 4, userId: 3, title: 'dolorem eum magni eos body: Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident' },
    ];
    nextId = 1000;
    findAll() { return this.posts; }
    findOne(id) {
        const p = this.posts.find(x => x.id === id);
        if (!p)
            throw new common_1.NotFoundException('Post not found');
        return p;
    }
    findByUser(userId) {
        return this.posts.filter(p => p.userId === userId);
    }
    create(dto) {
        const p = { id: this.nextId++, ...dto };
        this.posts.unshift(p);
        return p;
    }
    createForUser(userId, dto) {
        const p = { id: this.nextId++, userId, title: dto.title, body: dto.body };
        this.posts.unshift(p);
        return p;
    }
    update(id, dto) {
        const idx = this.posts.findIndex(x => x.id === id);
        if (idx === -1)
            throw new common_1.NotFoundException('Post not found');
        const prev = this.posts[idx];
        const updated = {
            id: prev.id,
            userId: dto.userId ?? prev.userId,
            title: dto.title ?? prev.title,
            body: dto.body ?? prev.body,
        };
        this.posts[idx] = updated;
        return updated;
    }
    remove(id) {
        const before = this.posts.length;
        this.posts = this.posts.filter(x => x.id !== id);
        if (this.posts.length === before)
            throw new common_1.NotFoundException('Post not found');
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)()
], PostsService);
//# sourceMappingURL=posts.service.js.map