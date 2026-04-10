import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class News extends BaseEntity {
  @Column({ type: 'varchar' })
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar' })
  title: string;
  @Column({ type: 'text' })
  info: string;
  @Column({ type: 'varchar' })
  img: string;
}
