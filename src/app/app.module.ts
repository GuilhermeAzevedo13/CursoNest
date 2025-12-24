import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConceitosAutomaticoModule } from 'src/conceitos-automatico/conceitos-automatico.module';

@Module({
  imports: [ConceitosAutomaticoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
