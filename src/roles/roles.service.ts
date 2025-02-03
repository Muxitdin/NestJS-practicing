import { Injectable } from "@nestjs/common";
import { CreateRoleDto } from "./dto/create-role.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "./roles.entity";
import { Repository } from "typeorm";

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>
    ) {}

    async createRole(dto: CreateRoleDto): Promise<Role> {
        const role = await this.roleRepository.create(dto);
        await this.roleRepository.save(role);
        return role;
    }

    async getRoleByValue(value: string): Promise<Role> {
        const role = await this.roleRepository.findOneBy({ value });
        return role;
    }

    async getAllRoles(): Promise<Role[]> {
        return await this.roleRepository.find(); // Возвращает массив ролей, но функция обернет его в Promise, потому что при использовании async перед функцией, функция всегда будет возвращать промис и из-за этого наш метод getAllRoles будет возвращать Promise<Role[]>
    }
}
