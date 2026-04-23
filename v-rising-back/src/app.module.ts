import { Module } from '@nestjs/common';
import { NewsModule } from './news/news.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegionsModule } from './regions/regions.module';
import { ItemsModule } from './resources/resources.module';
import { AbilitiesModule } from './abilities/abilities.module';
import { WeaponsModule } from './weapons/weapons.module';

@Module({
  imports: [
    NewsModule,
    RegionsModule,
    ItemsModule,
    AbilitiesModule,
    WeaponsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'nestjscourse',
      database: 'sampledb',
      autoLoadEntities: true,
    }),
  ],
})
export class AppModule {}
