import { SortOrder } from '@app/common/types/query';
import { TransformToArray } from '../../lib/decorators/transform.decorator';
import { SelectQuery, SkipQuery, TakeQuery } from '../../types/query';

export class PostQuery extends SelectQuery implements TakeQuery, SkipQuery {
  skip?: number;
  take?: number;
  @TransformToArray()
  select?: [
    'id',
    'content',
    'scope',
    'userId',
    'createdAt',
    'updatedAt',
    'medias',
    'tags',
  ];
  orderField?: 'createdAt' | 'updatedAt';
  orderDirection?: 'asc' | 'desc';
  @TransformToArray()
  userId?: string[];
  @TransformToArray()
  idsNotIn?: string[];
  constructor({
    select,
    skip,
    take,
    orderField,
    orderDirection,
    userId,
    idsNotIn,
  }: {
    select?: string[];
    skip?: number;
    take?: number;
    orderField?: 'createdAt' | 'updatedAt';
    orderDirection?: 'asc' | 'desc';
    userId?: string[];
    idsNotIn?: string[];
  }) {
    super(select);
    this.skip = skip;
    this.take = take;
    this.orderField = orderField;
    this.orderDirection = orderDirection;
    this.userId = userId;
    this.idsNotIn = idsNotIn;
  }
  extract() {
    return {
      skip: this.skip,
      take: this.take,
      select: this.extractSelect(),
      orderBy: {
        [this.orderField || 'createdAt']:
          this.orderDirection === 'asc' ? SortOrder.ASC : SortOrder.DESC,
      },
      where: {
        userId: {
          in: this.userId,
        },
        id: {
          notIn: this.idsNotIn,
        },
      },
    };
  }
}
