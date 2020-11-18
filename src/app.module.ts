import { Module } from '@nestjs/common'
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose'
import { AppConfigModule } from './config/app-config.module'
import { AppConfigService } from './config/app-config.service'
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: ({ uri }: AppConfigService): MongooseModuleOptions => ({
        uri,
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      }),
      inject: [AppConfigService],
      imports: [AppConfigModule]
    }),
    AppConfigModule,
    CommentsModule
  ]
})
export class AppModule {}
