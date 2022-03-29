import { IsNotEmpty, IsEmail, MinLength, IsUrl, ValidateIf } from "class-validator";
import { Transform, TransformFnParams } from 'class-transformer';

export class LoginParams {
    @Transform(({ value }: TransformFnParams) => value.toLowerCase().trim())
	email: string;
    
	password: string;
}
export class RegisterParams {
	@IsNotEmpty({ message: 'El campo nombre es requerido' })
    name: string;

    @IsNotEmpty({ message: 'El campo apellido es requerido' })
    lastname: string;

    @IsNotEmpty({ message: 'El campo email es requerido' })
    @IsEmail({},{ message: 'El correo electrónico no es válido' })
    @Transform(({ value }: TransformFnParams) => value.toLowerCase().trim())
    email: string;
    
    @IsNotEmpty({ message: 'El campo telefono es requerido' })
    phone: string;

    @IsNotEmpty({ message: 'El campo contraseña es requerido' })
	@MinLength(6,{ message: 'La contraseña debe tener mínimo 6 caracteres' })
    password: string;

    password_confirmation: string;

    level_id: number;

    verified?: number;
}

export class RecoverParams {
    @Transform(({ value }: TransformFnParams) => value.toLowerCase().trim())
	email: string;
}

export interface CheckCodeParams {
	code: string;
}

export class ResetParams {
	@IsNotEmpty({ message: 'El campo nueva contraseña es requerido' })
	@MinLength(6,{ message: 'La contraseña debe tener mínimo 6 caracteres' })
    password: string;

    password_confirmation: string;

    code: string;
}
export class VerifyUserDTO {
    @IsNotEmpty({ message: 'El campo de código es requerido' })
    url: string;
}