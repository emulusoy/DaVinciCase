import { CreatePostDto } from './dto/create-post.dto';
import { CreatePostForUserDto } from './dto/createpostforuser.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';
export declare class PostsController {
    private readonly posts;
    constructor(posts: PostsService);
    findAll(): import("../common/types").Post[];
    findOne(id: number): import("../common/types").Post;
    create(dto: CreatePostDto): import("../common/types").Post;
    update(id: number, dto: UpdatePostDto): import("../common/types").Post;
    remove(id: number): {
        ok: boolean;
    };
    findByUser(userId: number): import("../common/types").Post[];
    createForUser(userId: number, dto: CreatePostForUserDto): import("../common/types").Post;
}
