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
  constructor(select?: string[], skip?: number, take?: number) {
    super(select);
    this.skip = skip;
    this.take = take;
  }
  extract() {
    return {
      skip: this.skip,
      take: this.take,
      select: this.extractSelect(),
    };
  }
}
