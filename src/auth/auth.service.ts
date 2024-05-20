import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';

import * as bcryptjs from 'bcryptjs'
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RecoverDto } from './dto/recover.dto';
import { UpdateDto } from './dto/update.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    async login({ email, password }: LoginDto) {

        const user = await this.usersService.findOneByEmail(email)
        if (!user) {
            throw new UnauthorizedException('Wrong Credentials')
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Wrong Credentials')
        }

        const payload = { email: user.email }
        const token = await this.jwtService.signAsync(payload);

        return { token, email };
    }

    async register({ email, password }: RegisterDto) {
        const user = await this.usersService.findOneByEmail(email)
        if (user) {
            throw new BadRequestException('User already exist')
        }

        return await this.usersService.create({ email, password: await bcryptjs.hash(password, 10) })
    }

    async updatePassword({ email, password, newPassword }: UpdateDto) {

        const user = await this.usersService.findOneByEmail(email)
        if (!user) {
            throw new BadRequestException('User doesnt exist')
        }

        const passwordValid = await bcryptjs.compare(password, user.password)
        if (!passwordValid) {
            throw new BadRequestException({
                msg: 'Wrong Password',
                status: 2
            })
        }
        return await this.usersService.updatePassword({ email, password: await bcryptjs.hash(newPassword, 10) })
    }

    async recoverPassword({ email, password }: RecoverDto) {
        const user = await this.usersService.findOneByEmail(email)
        if (!user) {
            throw new BadRequestException('User doesnt exist')
        }
        return await this.usersService.updatePassword({ email, password: await bcryptjs.hash(password, 10) })
    }
}
