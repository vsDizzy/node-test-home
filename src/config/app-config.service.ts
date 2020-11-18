import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get env(): string {
    return this.configService.get<string>('env')
  }

  get port(): number {
    return this.configService.get<number>('port')
  }

  get uri(): string {
    return this.configService.get<string>('uri')
  }
}
