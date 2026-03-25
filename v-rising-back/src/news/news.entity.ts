import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum NewsIds {
  'invaders-of-oakveil' = 'invaders-of-oakveil',
  'dev-update-30' = 'dev-update-30',
  'update-1.1' = 'update-1.1',
  'invaders-of-oakveil-start-date' = 'invaders-of-oakveil-start-date',
  'dev-update-29' = 'dev-update-29',
  'dev-update-28' = 'dev-update-28',
  'art-contest-winners' = 'art-contest-winners',
  'invaders-of-oakveil-gameplay' = 'invaders-of-oakveil-gameplay',
}

@Entity()
export class News extends BaseEntity {
  @Column({
    type: 'enum',
    enum: [NewsIds],
  })
  @PrimaryGeneratedColumn('uuid')
  id: NewsIds;
  @Column({ type: 'varchar' })
  title: string;
  @Column({ type: 'text' })
  info: string;
  @Column({ type: 'varchar' })
  img: string;
}
