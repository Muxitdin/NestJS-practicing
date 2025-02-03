import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { UserRoles } from "../shared/entities/user-roles.entity";

@Entity({ name: "roles" })
export class Role {
    @ApiProperty({ example: "1", description: "unique identifier" })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: "ADMIN", description: "unique role value" })
    @Column({ unique: true })
    value: string;

    @ApiProperty({ example: "administrator", description: "role description" })
    @Column({ nullable: false })
    description: string;

    @OneToMany(() => UserRoles, (userRole) => userRole.role)
    users: UserRoles[]; // users who have this role
}