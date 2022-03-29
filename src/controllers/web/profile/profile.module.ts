import { Module } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize";
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { User } from 'src/models';

@Module({
    imports: [
        SequelizeModule.forFeature([
            User
        ])
    ],
    controllers: [
        ProfileController
    ],
    providers: [
        ProfileService
    ]
})
export class ProfileModule { }
