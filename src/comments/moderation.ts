import { IsEnum } from 'class-validator'

enum ModerationStatus {
  'approved',
  'declined'
}

export class ModerationDTO {
  @IsEnum(ModerationStatus)
  status: string
}
