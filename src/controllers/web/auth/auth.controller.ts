import { Controller, Post, Res, HttpStatus, Body, UseInterceptors, UploadedFile, Param, Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { 
	LoginParams, 
	RegisterParams, 
	RecoverParams, 
	CheckCodeParams, 
	ResetParams,
	VerifyUserDTO
} from './auth.entity';
import { AuthService } from './auth.service';
import { Constants, Hash, UploadFile } from '../../../utils';

@Controller('api/auth')
export class AuthController {

	constructor(private readonly authService: AuthService) {

	}

	@Post('/login')
	async login(@Body() request: LoginParams, @Res() response: Response) {
		const user = await this.authService.findUserVerified(request.email);
		const errorMessage = 'Las credenciales ingresadas son incorrectas y/o la cuenta no está verificada, intente nuevamente'
		if (!user) {
			return response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
				error: errorMessage
			});
		}

		if (await Hash.check(request.password,user.password)) {
			if (user.level_id == Constants.LEVELS.ADMIN) {
				return response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
					error: errorMessage
				});
			}

			return response.status(HttpStatus.OK).json({
				user
			});
		}
		else {
			return response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
				error: errorMessage
			});
		}
	}

	@Post('/register')
    @UseInterceptors(FileInterceptor('photo',
      UploadFile('users')
    ))
	async register(@Body() request: RegisterParams, @Res() response: Response, @UploadedFile() file: Express.Multer.File) {
		if (request.password != request.password_confirmation) {
			return response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
				error: 'Las contraseñas no coinciden'
			});
		}

		const _user = await this.authService.findByEmail(request.email);

		if (_user) {
			return response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
				error: 'El correo electrónico ya se encuentra registrado'
			});
		}

		const user = await this.authService.createUser(request, file);
		
		return response.status(HttpStatus.OK).json({
			user
		});
	}

	@Post('/recover')
	async recover(@Body() request: RecoverParams, @Res() response: Response) {
		const user = await this.authService.findByEmail(request.email);

		if (!user || user.level_id == Constants.LEVELS.ADMIN) {
			return response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
				error: 'El correo electrónico no se encuentra registrado'
			});
		}

		await this.authService.recover(request,user);

		return response.status(HttpStatus.OK).send();
	}

	@Post('/check-code')
	async checkCode(@Body() request: CheckCodeParams, @Res() response: Response) {
		const password = await this.authService.getCode(request.code);

		if (!password) {
			return response.status(HttpStatus.OK).json({
				result: false
			});
		}

		return response.status(HttpStatus.OK).json({
			result: true
		});
	}

	@Post('/reset')
	async reset(@Body() request: ResetParams, @Res() response: Response) {
		if (request.password != request.password_confirmation) {
			return response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
				error: 'Las contraseñas no coinciden'
			});
		}

		const password = await this.authService.getCode(request.code);

		if (!password) {
			return response.status(HttpStatus.OK).json({
				result: false
			});
		}

		const user = await this.authService.findByPk(password.user_id);

		if (user.level_id == Constants.LEVELS.ADMIN) {
			return response.status(HttpStatus.OK).json({
				result: false
			});
		}

		await this.authService.updatePassword(request,user,password);

		return response.status(HttpStatus.OK).json({
			result: true
		});
	}

	@Post('/modules/:level?')
	async modules(@Param() params, @Res() response: Response) {
		return response.status(HttpStatus.OK).json({
			modules: await this.authService.getModules(params.level)
		});
	}

	@Post('/verify')
	async verify(@Res() response: Response, @Body() request: VerifyUserDTO) {
		const url: string = request.url;
		const verified: number = await this.authService.verify(url);
		if (verified) {
			return response.status(HttpStatus.OK).json({
				message: 'Usuario verificado correctamente'
			});
		} else {
			return response.status(HttpStatus.OK).json({
				error: 'No se pudo verificar al usuario y/o el usuario ya fue verificado'
			});
		}
	}
}
