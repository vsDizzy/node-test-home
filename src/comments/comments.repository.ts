import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { CommentName, Comment } from 'src/schemas/comment.schema'
import { Model, Types } from 'mongoose'

@Injectable()
export class CommentsRepository {
  constructor(@InjectModel(CommentName) private commentModel: Model<Comment>) {}

  add(comment: Comment): Promise<Comment> {
    return new this.commentModel(comment).save()
  }

  getAll(threadId: string) {
    return 4
  }

  get(threadId: string, id: string) {
    const _id = Types.ObjectId(id)
    return this.commentModel
      .aggregate()
      .match({ _id, threadId })
      .graphLookup({
        from: 'comment',
        startWith: '$replyTo',
        connectFromField: 'replyTo',
        connectToField: '_id',
        as: 'replies'
      })
  }
}
