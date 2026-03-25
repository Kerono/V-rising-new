import { IsEnum } from 'class-validator';
import { NewsIds } from 'src/news/news.entity';

export class SpecificNewsInfoDto {
  @IsEnum(NewsIds, { message: 'id is incorrect' })
  id: NewsIds;
}
