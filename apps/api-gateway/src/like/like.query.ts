import { SelectQuery, SkipQuery, TakeQuery } from '../types/query';

export class LikeQuery extends SelectQuery implements SkipQuery, TakeQuery {
  take?: number;
  skip?: number;
  postId?: string;

  select?: ['id', 'userId', 'postId', 'createdAt'];
  constructor(select: string[], take: number, skip: number, postId?: string) {
    super(select);
    this.take = take;
    this.skip = skip;
    this.postId = postId;
  }

  extract() {
    return {
      select: this.select,
      take: this.take,
      skip: this.skip,
      where: {
        postId: this.postId,
      },
    };
  }
}
