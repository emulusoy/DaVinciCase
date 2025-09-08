import { Post } from '../common/types';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostsService {
    private posts;
    private nextId;
    findAll(): Post[];
    findOne(id: number): Post;
    findByUser(userId: number): Post[];
    create(dto: CreatePostDto): Post;
    createForUser(userId: number, dto: {
        title: string;
        body?: string;
    }): Post;
    update(id: number, dto: UpdatePostDto): Post;
    remove(id: number): void;
}
