import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from './users.entity';
import { CreateUserDto } from "./dto/create-user.dto";
import { RolesService } from "../roles/roles.service";
import { UserRoles } from "../shared/entities/user-roles.entity";

@Injectable()
export class UsersService {
    constructor(
        private readonly roleService: RolesService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(UserRoles)
        private readonly userRolesRepository: Repository<UserRoles>,
    ) {}

    async createUser(dto: CreateUserDto): Promise<User> {
        const existingUser = await this.userRepository.findOneBy({email: dto.email});
        if (existingUser) {
            throw new BadRequestException("User already exists");
        }
        const user = await this.userRepository.create(dto);
        let role = await this.roleService.getRoleByValue("USER")
        if (!role) {
            role = await this.roleService.createRole({ value: "USER", description: "user"})
        }

        // Assign the role to the user by creating a user-role association
        const userRole = new UserRoles();
        userRole.user = user;
        userRole.role = role;

        await this.userRepository.save(user);
        await this.userRolesRepository.save(userRole);
        console.log(user);
        return user;
    }

    async getAllUsers():Promise<User[]> {
        const users = await this.userRepository.find();
        return users;
    }
}
