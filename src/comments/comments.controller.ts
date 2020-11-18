import { Controller, HttpCode, HttpStatus, Post, Body } from '@nestjs/common';
import { CommentsRepository } from './comments.repository';
import { Comment} from 'src/schemas/comment.schema'

@Controller('comments')
export class CommentsController {
  constructor(
    private commentsRepository: CommentsRepository
  ) { }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async addComment(@Body() comment: Comment): Promise<Comment> {
    return this.commentsRepository.add(comment)
  }
}
