import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'
import { AppConfigService } from './config/app-config.service'
import { ErrorInterceptor } from './interceptors/error.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(new ErrorInterceptor())
  const config = app.get(AppConfigService)
  await app.listen(config.port)
}

bootstrap()
