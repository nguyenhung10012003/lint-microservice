import { SelectQuery, SkipQuery, TakeQuery } from '../../types/query';

export class CommentQuery extends SelectQuery implements TakeQuery, SkipQuery {
  skip?: number;
  take?: number;
  select?: [
    'id',
    'content',
    'createdAt',
    'updatedAt',
    'deletedAt',
    'postId',
    'userId',
    'replies',
  ];
  constructor(select: string[], skip: number, take: number) {
    super(select);
    this.skip = skip;
    this.take = take;
  }

  extract() {
    return {
      select: this.extractSelect(),
      skip: this.skip,
      take: this.take,
    };
  }
}
