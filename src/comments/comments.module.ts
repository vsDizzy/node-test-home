import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsRepository } from './comments.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentName, CommentSchema } from 'src/schemas/comment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CommentName, schema: CommentSchema }])
  ],
  controllers: [CommentsController],
  providers: [CommentsRepository]
})
export class CommentsModule {}
