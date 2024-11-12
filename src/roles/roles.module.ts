import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RolesController } from "./roles.controller";
import { RolesService } from "./roles.service";
import { Role } from "./roles.entity"
import { User } from "../users/users.entity";
import { UserRoles } from "../shared/entities/user-roles.entity";

@Module({
    controllers: [RolesController],
    providers: [RolesService],
    imports: [
        TypeOrmModule.forFeature([Role, User, UserRoles])
    ],
    exports: [
        RolesService,
    ]
})
export class RolesModule {
}
