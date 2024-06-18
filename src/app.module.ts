import { Module } from '@nestjs/common';
import db from './config/configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseService } from './config/database';
import { BarangService } from './modules/barang/barang.service';
import { BarangModule } from './modules/barang/barang.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Barang } from './modules/barang/barang.entity';
import { UsersController } from './modules/users/users.controller';
import { UsersService } from './modules/users/users.service';
import { UsersModule } from './modules/users/users.module';
import { User } from './modules/users/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [db],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseService,
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature(
      [ 
        Barang, User 
      ]),
    BarangModule,
    UsersModule,
  ],
  controllers: [UsersController],
  providers: [
    DatabaseService,
    BarangService,
    UsersService,
  ],
})
export class AppModule {}
