import { SortOrder } from '@app/common/types/query';
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
  postId?: string;
  orderField?: 'createdAt' | 'updatedAt';
  orderDirection?: 'asc' | 'desc';

  constructor(
    select: string[],
    skip: number,
    take: number,
    postId?: string,
    orderField?: 'createdAt' | 'updatedAt',
    orderDirection?: 'asc' | 'desc',
  ) {
    super(select);
    this.skip = skip;
    this.take = take;
    this.postId = postId;
    this.orderField = orderField;
    this.orderDirection = orderDirection;
  }

  extract() {
    return {
      select: this.extractSelect(),
      skip: this.skip,
      take: this.take,
      where: { postId: this.postId },
      orderBy: {
        [this.orderField]:
          this.orderDirection === 'asc' ? SortOrder.ASC : SortOrder.DESC,
      },
    };
  }
}
