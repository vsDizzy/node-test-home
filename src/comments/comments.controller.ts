import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post
} from '@nestjs/common'
import { Comment } from 'src/schemas/comment.schema'
import { CommentsRepository } from './comments.repository'

@Controller('comments')
export class CommentsController {
  constructor(private commentsRepository: CommentsRepository) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async addComment(@Body() comment: Comment): Promise<Comment> {
    return this.commentsRepository.add(comment)
  }

  @Get('/:threadId/:id')
  async getComment(@Param() { id }: { id: string }): Promise<unknown> {
    return this.commentsRepository.get(id)
  }

  @Get('/:threadId')
  async getRootComments(
    @Param() { threadId }: { threadId: string }
  ): Promise<unknown[]> {
    return this.commentsRepository.getRoot(threadId)
  }
}
