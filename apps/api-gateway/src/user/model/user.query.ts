import { TransformToArray } from '../../lib/decorators/transform.decorator';
import { SelectQuery, SkipQuery, TakeQuery } from '../../types/query';

export class UserQuery extends SelectQuery implements TakeQuery, SkipQuery {
  skip?: number;
  take?: number;
  select?: ['id', 'email', 'password', 'createdAt', 'updatedAt', 'profile'];
  @TransformToArray()
  ids: string[];
  constructor({
    select,
    skip,
    take,
    ids,
  }: {
    select?: string[];
    skip?: number;
    take?: number;
    ids?: string[];
  }) {
    super(select);
    this.skip = skip;
    this.take = take;
    this.ids = ids;
  }
  extract() {
    return {
      skip: this.skip,
      take: this.take,
      select: this.extractSelect(),
      where: {
        id: {
          in: this.ids,
        }
      }
    };
  }
}
