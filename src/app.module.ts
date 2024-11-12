import { Module } from "@nestjs/common";
import * as process from "node:process";
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from "@nestjs/config";
import { RolesService } from './roles/roles.service';
import { RolesController } from './roles/roles.controller';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { User } from "./users/users.entity";
import { Role } from "./roles/roles.entity";
import { UserRoles } from "./shared/entities/user-roles.entity";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`,
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            entities: [User, Role, UserRoles],
            synchronize: true
        }),
        UsersModule,
        RolesModule,
    ]
})
export class AppModule {
}