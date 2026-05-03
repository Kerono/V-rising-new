import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Bosses extends BaseEntity {
  @Column({ type: 'varchar' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar' })
  location: string;

  @Column({ type: 'text' })
  locations_details: string;

  @Column({ type: 'varchar' })
  img: string;

  @Column({ type: 'int' })
  level: number;
}

@Entity()
export class Abilities_Bosses extends BaseEntity {
  @Column({ type: 'varchar' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  ability_id: string;

  @Column({ type: 'varchar' })
  boss_id: string;
}

@Entity()
export class Abilities extends BaseEntity {
  @Column({ type: 'varchar' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  img: string;
}

@Entity()
export class Bosses_Attacks extends BaseEntity {
  @Column({ type: 'varchar' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  boss_id: string;

  @Column({ type: 'text' })
  description: string;
}

@Entity()
export class Bosses_Resources extends BaseEntity {
  @Column({ type: 'varchar' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  boss_id: string;

  @Column({ type: 'varchar' })
  resource_id: string;
}

@Entity()
export class Weapons_Bosses extends BaseEntity {
  @Column({
    type: 'varchar',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
  })
  weapon_id: string;

  @Column({
    type: 'varchar',
  })
  boss_id: string;
}

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
export class Weapons extends BaseEntity {
  @Column({
    type: 'varchar',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({
    type: 'varchar',
  })
  img: string;
}
