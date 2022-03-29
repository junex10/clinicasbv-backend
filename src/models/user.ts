import { Column, Model, Table, CreatedAt, UpdatedAt, DeletedAt, HasOne, HasMany } from "sequelize-typescript";
import {
} from '.';

@Table({
  timestamps: true,
  paranoid: true,
  tableName: 'users'
})
export class User extends Model {
    @Column
    name: string;

    @Column
    lastname: string;

    @Column
    email: string;

    @Column
    password: string;

    @Column
    level_id: number;

    @Column
    facebook: number;

    @Column
    facebook_id: string;

    @Column
    google: number;

    @Column
    google_id: string;

    @Column
    photo: string;

    @Column
    birthdate: Date;

    @Column
    loyalty_points: string;

    @Column 
    occupation: string;

    @Column
    civil_state: string;

    @Column
    age: number;

    @Column
    document: string;

    @Column
    phone: string;

    @Column
    confirmUrl: string;

    @Column
    verified: number;

    @CreatedAt
    @Column
    created_at: Date;

    @UpdatedAt
    @Column
    updated_at: Date;

    @DeletedAt
    @Column
    deleted_at: Date;
}