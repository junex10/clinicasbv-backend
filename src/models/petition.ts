import { Column, Model, Table, CreatedAt, UpdatedAt, DeletedAt, BelongsTo } from "sequelize-typescript";
import {
  Process,
  User
} from '.';

@Table({
  timestamps: true,
  paranoid: false,
  tableName: 'petition'
})
export class Petition extends Model {

  @BelongsTo(() => Process, 'process_id')
  process: Process;

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