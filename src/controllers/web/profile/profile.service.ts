import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { User } from "src/models";
import { Constants, Hash, Globals } from 'src/utils';
import {
    UpdateUserDTO
} from './profile.entity';
import * as fs from 'fs';
import * as moment from 'moment';

@Injectable()
export class ProfileService {
    constructor(
        @InjectModel(User) private userModel: typeof User,
    ) {

    }

    update = async (request: UpdateUserDTO, file: Express.Multer.File) => {
        const user = await this.userModel.findOne({ where: { id: request.id } });
        if (file !== undefined && user.photo !== null) {
            const PATH = `./public/storage/${user.photo}`;
            if (fs.existsSync(PATH)) fs.unlinkSync(PATH);
        }
        const age = Globals.calculateAge(request.birthdate);
        /*const update = await this.userModel.update(
            {
                name: request.name ?? user.person?.name,
                lastname: request.lastname ?? user.person?.lastname,
                email: request.email ?? user.email,
                phone: request.phone !== 'null' ? request.phone : null,
                photo: file !== undefined ? ('users/' + file.filename) : user.photo,
                document: request.document !== 'null' ? request.document : null,
                civil_state: request.civil_state !== 'null' ? request.civil_state : null,
                birthdate: request.birthdate !== null ? moment(request.birthdate).toDate() : '',
                age,
                occupation: request.occupation !== 'null' ? request.occupation : null,
                password: request.new_password !== 'null' ? await Hash.makeSync(request.new_password) : user.password,
                level_id: request.level_id ?? user.level_id
            },
            {
                where: { id: request.id }
            }
        )
        if (update !== null) return await this.userModel.findOne({ where: { id: request.id } });*/
        console.log(request, ' AQUI ')

        return null;
    }
}
