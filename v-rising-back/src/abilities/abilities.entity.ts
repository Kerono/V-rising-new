import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Abilities extends BaseEntity {
  @Column({ type: 'varchar' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  img: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar' })
  type: string;

  @Column({ type: 'varchar' })
  cast_time: string;

  @Column({ type: 'varchar' })
  subgroup: string;
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
export class Abilities_Notes extends BaseEntity {
  @Column({ type: 'varchar' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  ability_id: string;

  @Column({ type: 'text' })
  description: string;
}

@Entity()
export class Bosses extends BaseEntity {
  @Column({ type: 'varchar' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;
}
