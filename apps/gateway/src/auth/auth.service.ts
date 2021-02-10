import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  codes = new Map<string, number>([])

  addCode(email: string, code: number) {
    this.codes.set(email, code)
  }

  checkCode(email: string, code: number) {
    if (!this.codes.has(email)) {
      return new Error('Email not found')
    }
    return +code === this.codes.get(email) ? email : null
  }

  verifyAuthCode(email: string, code: number) {
    return this.checkCode(email, code)
  }

  createAuthCode(email: string) {
    const code = new Date().getTime()
    this.addCode(email, code)
    // return this.mailerService.sendCode(code, email)
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
