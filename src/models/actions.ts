import { Column, Model, Table, BelongsTo } from "sequelize-typescript";
import {
  Modules
} from '.';

@Table({
  timestamps: false,
  tableName: 'actions'
})
export class Actions extends Model {

  @BelongsTo(() => Modules, 'module_id')
  module: Modules;

  @Column
  name: string;

  @Column
  code: string;

}