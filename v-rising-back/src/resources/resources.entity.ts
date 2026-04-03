import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Resources extends BaseEntity {
  @Column({
    type: 'varchar',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  category_id: string;

  @Column({ type: 'boolean' })
  is_teleportable: boolean;

  @Column({ type: 'int' })
  stack_size: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar' })
  img: string;
}

@Entity()
export class Resources_Enemies extends BaseEntity {
  @Column({
    type: 'uuid',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
  })
  resource_id: string;

  @Column({ type: 'varchar' })
  enemy_id: string;
}

@Entity()
export class Resources_Categories extends BaseEntity {
  @Column({
    type: 'uuid',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
  })
  name: string;
}

@Entity()
export class Recipes extends BaseEntity {
  @Column({
    type: 'uuid',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
  })
  recipe_id: string;

  @Column({
    type: 'varchar',
  })
  create_from_id: string;

  @Column({
    type: 'varchar',
  })
  result_id: string;
}

@Entity()
export class Enemies extends BaseEntity {
  @Column({
    type: 'uuid',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
  })
  name: string;
}
