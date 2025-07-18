import { Entity, Column, TableForeignKey, ManyToMany, ManyToOne, JoinColumn } from 'typeorm';
import BaseModel from './base.entity';
import { User } from './user.entity';

@Entity('item')
export class Item extends BaseModel {
  @ManyToOne(() => User, (user) => user.items, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  userId: number;
}