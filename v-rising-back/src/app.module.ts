import { Module } from '@nestjs/common';
import { NewsModule } from './news/news.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegionsModule } from './regions/regions.module';
import { ItemsModule } from './resources/resources.module';
import { AbilitiesModule } from './abilities/abilities.module';
import { WeaponsModule } from './weapons/weapons.module';
import { BossesModule } from './bosses/bosses.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    NewsModule,
    RegionsModule,
    ItemsModule,
    AbilitiesModule,
    WeaponsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgresdb',
      port: 5432,
      username: 'postgres',
      password: 'nestjs',
      database: 'v-rising',
      autoLoadEntities: true,
      entities: ['dist/**/*.entity{.js,.ts}'],
    }),
    BossesModule,
    HealthModule,
  ],
})
export class AppModule {}
