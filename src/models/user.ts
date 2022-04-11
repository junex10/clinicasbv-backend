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
    logged_in: number;

    @Column
    verified: number;

    @Column
    status: number;

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