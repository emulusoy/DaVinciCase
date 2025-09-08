import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  root() {
    return { ok: true, msg: 'TRY /api/users' };
  }
}
