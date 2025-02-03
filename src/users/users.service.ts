import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
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

    async createUser(dto: CreateUserDto): Promise<{ user: User, message: string}> {
        const existingUser = await this.userRepository.findOneBy({email: dto.email});
        if (existingUser) {
            throw new BadRequestException("User already exists");
        }
        const user = this.userRepository.create(dto); // create не возвращает промис, а просто создает экземпляр сущности, поэтому не требуется приписывать 'await'
        let role = await this.roleService.getRoleByValue("USER")
        if (!role) {
            role = await this.roleService.createRole({ value: "USER", description: "user"})
        }

        // Assign the role to the user by creating a user-role association
        const userRole = new UserRoles(); // Когда создаешь объект через new UserRoles(), у тебя полный контроль над созданием экземпляра. Это полезно, если ты хочешь явно указать поля или работать с кастомной логикой внутри конструктора класса.
        userRole.user = user;
        userRole.role = role;

        await this.userRepository.save(user);
        await this.userRolesRepository.save(userRole);
        console.log(user);
        return {user, message: "User has been created successfully"};

        // Метод create() в TypeORM только создает новый экземпляр сущности в памяти, но не сохраняет его в базу данных. Это эквивалентно использованию new, но с некоторыми преимуществами, как автоматическое заполнение полей и работа с вложенными объектами.
        // Метод save() сохраняет объект в базу данных. Если объект новый, он выполнит INSERT, если объект уже существует (определяется по первичному ключу), будет выполнен UPDATE.
    }

    async deleteUser(id: number): Promise<{ user: User[], message: string}> {
        const user = await this.userRepository.findBy({id}); // если не находит, то возвращает пустой массив
        console.log("🚀 ~ UsersService ~ deleteUser ~ user:", user)
        if (user.length === 0) {
            throw new NotFoundException("User not found");
        }
        await this.userRepository.delete(id);
        return { user, message: "User has been deleted successfully"};
    }

    async getAllUsers():Promise<User[]> {
        const users = await this.userRepository.find({relations: ['roles']}); // relations: ['roles'] — это опция TypeORM, которая позволяет загрузить связанные сущности (в данном случае — роли) для каждого пользователя.
        return users; // Возвращает массив пользователей, но функция обернет его в Promise, потому что при использовании async перед функцией, функция всегда будет возвращать промис и из-за этого наш метод getAllUsers будет возвращать Promise<User[]>
    }
}
