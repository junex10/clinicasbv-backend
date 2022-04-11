import { Column, Model, Table, CreatedAt, UpdatedAt, DeletedAt, BelongsTo } from "sequelize-typescript";
import {
    Modules
} from '.';

@Table({
  timestamps: true,
  paranoid: true,
  tableName: 'actions'
})
export class Actions extends Model {

    @BelongsTo(() => Modules, 'module_id')
    modules: Modules;

    @Column
    code: string;

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