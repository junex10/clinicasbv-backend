import { Column, Model, Table, CreatedAt, UpdatedAt, DeletedAt, BelongsTo } from "sequelize-typescript";
import {
    Modules,
    User
} from '.';

@Table({
  timestamps: true,
  paranoid: false,
  tableName: 'permissions'
})
export class Permissions extends Model {

    @BelongsTo(() => Modules, 'module_id')
    modules: Modules;

    @BelongsTo(() => User, 'user_id')
    user: User;

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