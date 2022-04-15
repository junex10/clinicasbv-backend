import { Column, Model, Table } from "sequelize-typescript";

@Table({
  timestamps: true,
  paranoid: true,
  tableName: 'menu'
})
export class Menu extends Model {

  @Column
  name: string;

  @Column
  mainMenu: number;

  @Column
  code: string;

  @Column
  url: string;

  @Column
  main_menu_id: number;

  @Column
  status: number;

}