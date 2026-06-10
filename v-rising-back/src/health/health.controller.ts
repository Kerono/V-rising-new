import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
} from '@nestjs/terminus';

const local = 'http://localhost:3000';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private healthIndicator: HttpHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.healthIndicator.pingCheck('allNews', `${local}/news`),
    ]);
  }
}
