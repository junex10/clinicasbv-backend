import { Column, Model, Table, BelongsTo, DefaultScope } from "sequelize-typescript";
import {
  Actions,
  Modules
} from '.';

@DefaultScope(() => ({
  include: [{
    model: Actions,
    attributes: ['id', 'name', 'code'],
    include: [{
      model: Modules,
      attributes: ['id', 'name', 'icon', 'code', 'status']
    }]
  }]
}))

@Table({
  timestamps: true,
  paranoid: false,
  tableName: 'permissions'
})
export class Permissions extends Model {

  @Column
  action_id: number;

  @BelongsTo(() => Actions, 'action_id')
  actions: Actions[];

  @Column
  user_id: number;

}