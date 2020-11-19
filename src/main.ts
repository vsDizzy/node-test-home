import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { AppConfigService } from './config/app-config.service'
import { ErrorInterceptor } from './interceptors/error.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.useGlobalInterceptors(new ErrorInterceptor())
  const config = app.get(AppConfigService)
  await app.listen(config.port)
}

bootstrap()
