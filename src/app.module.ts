import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig, { DatabaseConfig } from './config/database.config';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const db = config.get<DatabaseConfig>('database');

        return {
          type: 'postgres',
          host: db!.host,
          port: db!.port,
          username: db!.user,
          password: db!.password,
          database: db!.name,
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
    RolesModule,
  ],
})
export class AppModule {}
