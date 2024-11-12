import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./users.entity";

@ApiTags("Users")
@Controller("/users")
export class UsersController {
    constructor(private usersService: UsersService) {
    }

    @ApiOperation({ summary: "creating a single user" })
    @ApiResponse({ status: 201, type: User })
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto);
    }

    @ApiOperation({ summary: "get all the users" })
    @ApiResponse({ status: 200, type: [User] })
    @Get()
    getUsers() {
        return this.usersService.getAllUsers();
    }
}
