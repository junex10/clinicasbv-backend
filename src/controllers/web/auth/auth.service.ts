import { Injectable, Body } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { User, PasswordReset, Modules, Permissions, Level } from "src/models";
import { MailerService } from '@nestjs-modules/mailer';
import { RecoverParams, ResetParams, RegisterParams } from './auth.entity';
import { Constants, Hash, Globals, JWTAuth } from 'src/utils';
import * as moment from 'moment';

@Injectable()
export class AuthService {

	constructor(
		@InjectModel(User) private userModel: typeof User,
		@InjectModel(PasswordReset) private passwordResetModel: typeof PasswordReset,
		@InjectModel(Modules) private moduleModel: typeof Modules,
		private mailerService: MailerService
	) {

	}

	findUserVerified = async (email: string) => {
		const user = await this.userModel.findOne({
			include: [{
				model: Level,
				include: ['permissions']
			}],
			where: {
				email,
				verified: Constants.USER.USER_VERIFIED.VERIFIED
			}
		});
		user.logged_in = Constants.USER.LOGGED_IN.IN;
		user.save();
		return user;
	}

	findByEmail(email: string) {
		return this.userModel.findOne({
			where: {
				email
			}
		});
	}

	findByPk(user_id: number) {
		return this.userModel.findOne({
			where: {
				id: user_id
			}
		});
	}

	getCode(code: string) {
		return this.passwordResetModel.findOne({
			where: {
				code,
				status: Constants.PASSWORD_RESET_STATUS.ACTIVE
			}
		});
	}

	async updatePassword(@Body() request: ResetParams, user: User, password: PasswordReset) {
		await this.userModel.update({
			password: Hash.makeSync(request.password)
		}, {
			where: {
				id: user.id
			}
		})

		return this.passwordResetModel.update({
			status: Constants.PASSWORD_RESET_STATUS.INACTIVE
		}, {
			where: {
				id: password.id
			}
		});
	}

	async recover(@Body() request: RecoverParams, user: User) {
		await this.passwordResetModel.update({
			status: Constants.PASSWORD_RESET_STATUS.INACTIVE
		}, {
			where: {
				user_id: user.id,
				status: Constants.PASSWORD_RESET_STATUS.ACTIVE
			}
		});

		const code = Hash.makeSync(user.email + moment().format('YYYYMMDDHHmmss'))
			.replace(/\//g, '')
			.replace(/\./g, '')
			.replace(/,/g, '');

		await this.passwordResetModel.create({
			user_id: user.id,
			code
		});

		try {
			await this.mailerService.sendMail({
				to: user.email,
				subject: 'Recuperación de Contraseña | ' + process.env.MAIL_FROM_NAME,
				template: './reset',
				context: {
					code
				}
			});
		}
		catch (e) {
			console.log(e);
		}
	}

	async createUser(@Body() request: RegisterParams, file: Express.Multer.File) {
		const user = await this.userModel.create({
			name: request.name,
			lastname: request.lastname,
			phone: request.phone,
			email: request.email,
			password: Hash.makeSync(request.password),
			level_id: request.level_id || Constants.LEVELS.PATIENT,
			photo: file ? ('users/' + file.filename) : null,
			confirmUrl: await this.generateURL(),
		});
		/*try {
			await this.mailerService.sendMail({
				to: user.email,
				subject: 'Confirmación de cuenta | ' + process.env.MAIL_FROM_NAME,
				template: './register',
				context: {
					user: user.name,
					confirm_url: user.confirmUrl
				}
			});
		}
		catch (e) {
			console.log(e);
		}*/
		return user;
	}

	async getModules(level: number) {
		let modules: any = [];
		if (level !== undefined) modules = await this.moduleModel.findAll();
		else modules = await this.moduleModel.findAll();
		
		return modules;
	}

	verify = async (url: string) => {
		const user = await this.userModel.update(
			{
				verified: Constants.USER.USER_VERIFIED.VERIFIED
			},
			{
				where: { 
					confirmUrl: url,
					verified: Constants.USER.USER_VERIFIED.NO_VERIFIED 
				}
			}
		);
		return user[0];
	}

	checkPermissions = async (permissions: string, code: string): Promise<boolean> => {
		const readPermissions = JWTAuth.readToken(permissions);
		const auth = await readPermissions.permissions.filter((value: any) => code === value.actions.code);
		if (auth !== null) {
			if (auth.length > 0) return true;
		}
		return false;
	}

	private generateURL = async () => {
		let numbers = '';
		const min: number = 0;
		const max: number = 9;
		for (let x = 0; x < 6; x++) {
			numbers += (Math.floor(Math.random() * (max - min)) + min).toString();
		}
		return `verify/${Globals.filterByUrl(await Hash.make(numbers))}`;
	}
}
