import { Entity, Column, OneToMany } from 'typeorm';
import BaseModel from './base.entity';
import { Item } from './item.entity';

@Entity('users')
export class User extends BaseModel {
  @Column({ length: 100 })
  firstName: string;

  @Column({ length: 100 })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Item, (item) => item.user)
  items: Item[];
}