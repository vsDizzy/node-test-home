import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { config } from './config'
import { AppConfigService } from './app-config.service'

@Module({
  imports: [ConfigModule.forRoot({ load: [config] })],
  providers: [AppConfigService],
  exports: [AppConfigService]
})
export class AppConfigModule {}
