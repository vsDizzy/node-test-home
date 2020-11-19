import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { Comment, CommentName } from 'src/schemas/comment.schema'

@Injectable()
export class CommentsRepository {
  constructor(@InjectModel(CommentName) private commentModel: Model<Comment>) {}

  add(comment: Comment): Promise<Comment> {
    return new this.commentModel(comment).save()
  }

  async getRoot(
    threadId: string,
    { skip, limit }: { skip?: number; limit?: number }
  ): Promise<unknown> {
    const comments = (await this.commentModel
      .find({ threadId, replyTo: null })
      .sort({ createdAt: 'desc' })
      .skip(skip)
      .limit(limit)
      .lean()) as any[]
    await this.loadRepliesForMultipleComments(comments)
    return comments
  }

  private async loadRepliesForMultipleComments(comments: unknown[]) {
    await Promise.all(comments.map(x => this.loadRepliesForSingleComment(x)))
  }

  async get(id: string): Promise<unknown> {
    const comment = (await this.commentModel
      .findById(Types.ObjectId(id))
      .lean()) as any
    await this.loadRepliesForSingleComment(comment)
    return comment
  }

  private async loadRepliesForSingleComment(comment: any): Promise<void> {
    const rs = await this.getCommentReplies(comment._id)
    if (rs.length) {
      comment.replies = rs
    }
  }

  private async getCommentReplies(commentId: Types.ObjectId) {
    const replies = (await this.commentModel
      .find({ replyTo: commentId })
      .sort({ createdAt: 'desc' })
      .lean()) as any[]
    await this.loadRepliesForMultipleComments(replies)
    return replies as any
  }

  async update(id: string, data: Partial<Comment>): Promise<unknown> {
    return await this.commentModel
      .findByIdAndUpdate(id, data, { new: true })
      .lean()
  }
}
