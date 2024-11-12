import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "../../users/users.entity";
import { Role } from "../../roles/roles.entity";

@Entity({ name: "user_roles" })
export class UserRoles {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.roles, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => Role, (role) => role.users, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'roleId' })
    role: Role;
}
