import { v1 as uuidv1 } from 'uuid'
import { Document, Schema, Types } from 'mongoose'
import { isUUID, isDate, isNotEmpty } from 'class-validator'

export interface Comment extends Document {
  parentId: Types.ObjectId
  replyTo: Types.ObjectId
  body: string,
  threadId: string,
  createdAt: Date
}

export type CommentData = Pick<
  Comment,
  '_id' | 'replyTo' | 'body' | 'threadId' | 'createdAt'
>

export const CommentName = 'Comment'
export const CommentSchema = new Schema<Comment>({
  threadId: {
    type: String,
    required: true,
    default: uuidv1,
    validate: isUUID
  },
  createdAt: {
    type: Date,
    required: true,
    immutable: true,
    default: Date.now,
    validate: isDate
  },
  body: { type: String, required: true, validate: isNotEmpty }
})

CommentSchema.set('collection', 'comment')
