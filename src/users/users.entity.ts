import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { UserRoles } from "../shared/entities/user-roles.entity";

@Entity({ name: "users" })
export class User {
    @ApiProperty({ example: "1", description: "unique identifier" })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: "user@gmail.com", description: "user email" })
    @Column({ unique: true })
    email: string;

    @ApiProperty({ example: "12345678", description: "user password" })
    @Column({ nullable: false })
    password: string;

    @ApiProperty({ example: "true", description: "if banned or not" })
    @Column({ default: false })
    banned: boolean;

    @ApiProperty({ example: "unacceptable behavior", description: "ban reason" })
    @Column({ nullable: true })
    banReason: string;

    @OneToMany(() => UserRoles, (userRole) => userRole.user)
    roles: UserRoles[];
}
