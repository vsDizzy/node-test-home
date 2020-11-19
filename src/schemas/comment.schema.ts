import { isDate, isNotEmpty, isUUID } from 'class-validator'
import { Document, Schema, Types } from 'mongoose'
import { v1 as uuidv1 } from 'uuid'

export interface Comment extends Document {
  parentId: Types.ObjectId
  replyTo: Types.ObjectId
  body: string
  threadId: string
  createdAt: Date
  status: string
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
    validate: isDate,
    index: true
  },
  body: { type: String, required: true, validate: isNotEmpty },
  parentId: { type: Types.ObjectId, ref: 'comment', index: true },
  replyTo: { type: Types.ObjectId, ref: 'comment', index: true },
  status: {
    type: String,
    enum: ['pending', 'approved', 'declined'],
    default: 'pending'
  }
})

CommentSchema.set('collection', 'comment')
