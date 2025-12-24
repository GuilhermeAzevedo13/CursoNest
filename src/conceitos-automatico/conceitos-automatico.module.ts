import { Module } from '@nestjs/common';
import { ConceitosAutomaticoController } from './conceitos-automatico.controller';
import { AppService } from 'src/app/app.service';
import { ConceitosAutomaticoService } from './conceitos-automatico.service';

@Module({
  controllers: [ConceitosAutomaticoController],
  providers: [AppService, ConceitosAutomaticoService],
})
export class ConceitosAutomaticoModule {}
