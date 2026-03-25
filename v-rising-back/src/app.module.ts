import { Module } from '@nestjs/common';
import { NewsModule } from './news/news.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from './news/news.entity';
import { Regions } from './regions/regions.entity';
import { RegionsModule } from './regions/regions.module';
import { ItemsModule } from './resources/resources.module';

@Module({
  imports: [
    NewsModule,
    RegionsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'nestjscourse',
      database: 'sampledb',
      entities: [News, Regions],
      // synchronize: true,
      autoLoadEntities: true,
      // migrations: ['./src/data/migrations/*{.ts,.js}'],
    }),
    ItemsModule,
  ],
})
export class AppModule {}
