import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly users;
    constructor(users: UsersService);
    findAll(): import("../common/types").User[];
    findOne(id: number): import("../common/types").User;
    create(dto: CreateUserDto): import("../common/types").User;
    update(id: number, dto: UpdateUserDto): import("../common/types").User;
    remove(id: number): {
        ok: boolean;
    };
}
