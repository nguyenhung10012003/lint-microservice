import { CommentQuery } from './comment.query';

export class ReplyQuery extends CommentQuery {
  commentId?: string;
  constructor(
    select: string[],
    skip: number,
    take: number,
    other?: { commentId?: string },
  ) {
    super(select, skip, take);
    this.commentId = other?.commentId;
  }

  extract() {
    return {
      ...super.extract(),
      where: {
        commentId: this.commentId,
      },
    };
  }
}
