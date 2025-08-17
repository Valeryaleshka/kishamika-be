import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AppService } from '../app.service';
import { AuthUserGuard } from '../auth/guards/auth.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly appService: AppService,
  ) {}

  @UseGuards(AuthUserGuard)
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  // @Get(':id') // Matches GET /api/users/:id
  // getUser(@Param('id') id: string) {
  //   console.log(`GET /api/users/${id} endpoint hit`);
  //   return this.usersService.findByEmail('');
  // }
  //
  // @Post()
  // addUsers(@Body() data: { email: string; password: string }) {
  //   return this.usersService.findByEmail('');
  // }
}
