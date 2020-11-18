import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Body,
  Get,
  Param
} from '@nestjs/common'
import { CommentsRepository } from './comments.repository'
import { Comment } from 'src/schemas/comment.schema'
import { threadId } from 'worker_threads'
import { Types } from 'mongoose'

@Controller('comments')
export class CommentsController {
  constructor(private commentsRepository: CommentsRepository) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async addComment(@Body() comment: Comment): Promise<Comment> {
    return this.commentsRepository.add(comment)
  }

  @Get('/:threadId/:id')
  async getComment(
    @Param() { threadId, id }: { threadId: string; id: string }
  ) {
    return this.commentsRepository.get(threadId, id)
  }

  @Get('/:threadId')
  async getAllComments(@Param() { threadId }: { threadId: string }) {
    return this.commentsRepository.getAll(threadId)
  }
}
