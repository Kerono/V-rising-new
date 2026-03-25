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

// @Entity()
// export class Resources_Groups extends BaseEntity {
//   @Column({
//     type: 'int',
//   })
//   @PrimaryGeneratedColumn('uuid')
//   id: string;
//   @Column({ type: 'varchar' })
//   title: string;

//   @Column({ type: 'varchar' })
//   items_id: string;
// }

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
