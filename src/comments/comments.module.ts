import { Module } from '@nestjs/common'
import { InjectModel, MongooseModule } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Comment, CommentName, CommentSchema } from '../schemas/comment.schema'
import { CommentsController } from './comments.controller'
import { CommentsRepository } from './comments.repository'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CommentName, schema: CommentSchema }])
  ],
  controllers: [CommentsController],
  providers: [CommentsRepository]
})
export class CommentsModule {
  constructor(@InjectModel(CommentName) private commentModel: Model<Comment>) {
    this.commentModel.init().then(() => {
      console.info(`Created indexes for: ${CommentName}`)
    })
  }
}
