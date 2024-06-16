import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import db from './config/configuration';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from './config/database';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [db]
    })
  ],
  controllers: [AppController],
  providers: [
    AppService,
    DatabaseService
  ],
})
export class AppModule {}
