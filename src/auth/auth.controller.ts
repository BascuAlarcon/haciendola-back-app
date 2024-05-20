import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { RecoverDto } from './dto/recover.dto';
import { UpdateDto } from './dto/update.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto)
    }

    @Post('register')
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto)
    }

    @Get('authenticate')
    @UseGuards(AuthGuard)
    authenticate() {
        return 'profile'
    }

    @Patch('recoverPassword')
    recoverPassword(@Body() recoverDto: RecoverDto) {
        return this.authService.recoverPassword(recoverDto)
    }

    @Patch('updatePassword')
    updatePassword(@Body() updateDto: UpdateDto) {
        return this.authService.updatePassword(updateDto)
    }
}
