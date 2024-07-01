import { SelectQuery, SkipQuery, TakeQuery } from '../../types/query';

export class ProfileQuery extends SelectQuery implements TakeQuery, SkipQuery {
  skip?: number;
  take?: number;
  select?: ['id', 'dob', 'bio', 'userId', 'alias', 'avatar'];
  constructor(select?: string[], skip?: number, take?: number) {
    super(select);
    this.skip = skip;
    this.take = take;
  }
}
