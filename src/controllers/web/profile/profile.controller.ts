import { Body, Controller, Post, Res, HttpStatus, UseInterceptors, UploadedFile, UnprocessableEntityException } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Constants, UploadFile } from 'src/utils';
import { FileInterceptor } from '@nestjs/platform-express';
import { 
    UpdateUserDTO
} from './profile.entity';
import { Response } from 'express';

@Controller('api/profile')
export class ProfileController {
    constructor(
        private readonly profileService: ProfileService
    ) {

    }

    @Post('/update')
    @UseInterceptors(FileInterceptor('photo',
      UploadFile('users')
    ))
    async update(@Body() request: UpdateUserDTO, @Res() response: Response, @UploadedFile() file: Express.Multer.File) {
        try {
            const user = await this.profileService.update(request, file);
            return response.status(HttpStatus.OK).json({
                user
            });
        }
        catch(e) {
            throw new UnprocessableEntityException('No se pudo actualizar el perfil', e.message);
        }
 
    }
}
