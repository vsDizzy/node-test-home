import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CommentName, Comment} from "src/schemas/comment.schema";
import { Model } from "mongoose";

@Injectable()
export class CommentsRepository {
  constructor(
    @InjectModel(CommentName) private commentModel: Model<Comment>
  ) {}

  add(comment: Comment): Promise<Comment> {
    return new this.commentModel(comment).save()
  }
}
