import { TransformToArray } from '../lib/decorators/transform.decorator';

export interface SkipQuery {
  skip?: number;
}

export interface TakeQuery {
  take?: number;
}

export interface ManyQuery extends SkipQuery, TakeQuery {
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

export interface CountQuery {
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
