import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { User, Modules } from '../../../models';

@Module({
  imports: [
    SequelizeModule.forFeature([
      User,
      Modules
    ])
  ],
  controllers: [
    AuthController
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule {}
