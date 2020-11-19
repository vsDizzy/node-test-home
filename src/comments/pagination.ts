import { Type } from 'class-transformer'
import { IsInt, IsOptional } from 'class-validator'

export class PaginationDTO {
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  skip: number

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  limit: number
}
