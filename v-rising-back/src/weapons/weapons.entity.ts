import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  type: string;

  @Column({
    type: 'varchar',
  })
  img: string;

  @Column({
    type: 'text',
  })
  description: string;
}

@Entity()
export class Weapons_Skills extends BaseEntity {
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
  skill_img: string;

  @Column({
    type: 'varchar',
  })
  skill_name: string;

  @Column({
    type: 'text',
  })
  description: string;

  @Column({
    type: 'varchar',
  })
  tier_requirements_weapon_name: string;

  @Column({
    type: 'varchar',
  })
  tier_requirements_weapon_img: string;
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

//TODO complete bosses table
@Entity()
export class Bosses extends BaseEntity {
  @Column({ type: 'varchar' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;
}
