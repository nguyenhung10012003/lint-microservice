import { SelectQuery, SkipQuery, TakeQuery } from '../../types/query';

export class UserQuery extends SelectQuery implements TakeQuery, SkipQuery {
  skip?: number;
  take?: number;
  select?: ['id', 'email', 'password', 'createdAt', 'updatedAt', 'profile'];
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
