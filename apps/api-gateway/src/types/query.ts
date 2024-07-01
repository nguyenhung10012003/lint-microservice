import { TransformToArray } from '../lib/decorators/transform.decorator';

export interface ManyQuery {
  skip?: number;
  take?: number;
  select?: string[];
  [key: string]:
    | number
    | string
    | boolean
    | number[]
    | string[]
    | boolean[]
    | undefined;
}

export interface ISelectQuery {
  select?: string[];
  extractSelect(): any;
}

export interface SkipQuery {
  skip?: number;
}

export interface TakeQuery {
  take?: number;
}

export class SelectQuery implements ISelectQuery {
  @TransformToArray()
  select?: string[];
  constructor(select?: string[]) {
    this.select = select;
  }
  extractSelect() {
    if (!this.select) return undefined;

    return this.select.reduce((obj, curr) => {
      obj[curr] = true;
      return obj;
    }, {});
  }
}
