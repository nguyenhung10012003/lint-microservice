import { SortOrder } from '@app/common/types/query';
import { SelectQuery, SkipQuery, TakeQuery } from '../../types/query';

export class ReplyQuery extends SelectQuery implements TakeQuery, SkipQuery {
  skip: number;
  take: number;
  commentId?: string;
  orderField?: 'createdAt' | 'updatedAt';
  orderDirection?: 'asc' | 'desc';
  constructor(
    select: string[],
    skip: number,
    take: number,
    other?: {
      commentId?: string;
      orderField?: 'createdAt' | 'updatedAt';
      orderDirection?: 'asc' | 'desc';
    },
  ) {
    super(select);
    this.skip = skip;
    this.take = take;
    this.commentId = other?.commentId;
    this.orderField = other?.orderField;
    this.orderDirection = other?.orderDirection;
  }

  extract() {
    return {
      skip: this.skip,
      take: this.take,
      where: { commentId: this.commentId },
      orderBy: {
        [this.orderField]:
          this.orderDirection === 'asc' ? SortOrder.ASC : SortOrder.DESC,
      },
    };
  }
}
