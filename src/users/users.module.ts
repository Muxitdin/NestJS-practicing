import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { Role } from "../roles/roles.entity";
import { UserRoles } from "../shared/entities/user-roles.entity";
import { RolesModule } from "../roles/roles.module";

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [
        TypeOrmModule.forFeature([User, Role, UserRoles]),
        RolesModule
    ]
})
export class UsersModule {
}
