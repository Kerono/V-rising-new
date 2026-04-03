import { Module } from '@nestjs/common';
import { ItemsService } from './resources.service';
import { ItemsController } from './resources.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Resources,
  Resources_Enemies,
  Resources_Categories,
  Recipes,
  Enemies,
} from './resources.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Resources,
      Resources_Enemies,
      Resources_Categories,
      Recipes,
      Enemies,
    ]),
  ],
  providers: [ItemsService],
  controllers: [ItemsController],
})
export class ItemsModule {}
