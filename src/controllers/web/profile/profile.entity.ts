import { IsNotEmpty, IsEmail, MinLength, IsUrl, ValidateIf } from "class-validator";
import { Transform, TransformFnParams } from 'class-transformer';

export class UpdateUserDTO{

    id: number;

    @IsNotEmpty({ message: 'El campo nombre es requerido' })
    name: string;

    lastname: string;

    @IsNotEmpty({ message: 'El campo email es requerido' })
    @IsEmail({},{ message: 'El correo electrónico no es válido' })
    @Transform(({ value }: TransformFnParams) => value.toLowerCase().trim())
    email: string;
    
    phone: string;

    civil_state: string;
    birthdate?: Date | string;

    document: string;

    occupation: string;

    new_password?: string;

    level_id?: number;
}