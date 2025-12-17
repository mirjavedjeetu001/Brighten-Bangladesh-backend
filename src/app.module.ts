import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import appConfig from './config/app.config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { BlogsModule } from './modules/blogs/blogs.module';
import { MagazinesModule } from './modules/magazines/magazines.module';
import { MembershipsModule } from './modules/memberships/memberships.module';
import { UploadsModule } from './modules/uploads/uploads.module';
import { CmsModule } from './modules/cms/cms.module';
import { SettingsModule } from './modules/settings/settings.module';
import { JobsModule } from './modules/jobs/jobs.module';
import { CvTemplatesModule } from './modules/cv-templates/cv-templates.module';
import { UserCvsModule } from './modules/user-cvs/user-cvs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false,
        logging: process.env.NODE_ENV === 'development',
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
      serveStaticOptions: {
        index: false,
        redirect: false,
      },
    }),
    AuthModule,
    UsersModule,
    BlogsModule,
    MagazinesModule,
    MembershipsModule,
    UploadsModule,
    CmsModule,
    SettingsModule,
    JobsModule,
    CvTemplatesModule,
    UserCvsModule,
  ],
})
export class AppModule {}
