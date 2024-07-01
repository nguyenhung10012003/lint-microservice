import { SelectQuery, SkipQuery, TakeQuery } from './query';

export class ProfileSelectQuery
  extends SelectQuery
  implements TakeQuery, SkipQuery
{
  skip?: number;
  take?: number;
  select?: [
    'id',
    'dob',
    'bio',
    'userId',
    'alias',
    'avatar',
    'country',
    'gender',
  ];
  constructor(select?: string[], skip?: number, take?: number) {
    super(select);
    this.skip = skip;
    this.take = take;
  }
}
