import { TransformToArray } from "../../lib/decorators/transform.decorator";
import { SkipQuery, TakeQuery } from "../../types/query";

export class FeedQuery implements SkipQuery, TakeQuery {
  skip?: number;
  take?: number;
  @TransformToArray()
  idsNotIn?: string[];

  constructor({ skip, take, idsNotIn }: { skip?: number; take?: number; idsNotIn?: string[] }) {
    this.skip = skip;
    this.take = take;
    this.idsNotIn = idsNotIn;
  }

  extract() {
    return {
      skip: this.skip,
      take: this.take,
      idsNotIn: this.idsNotIn,
    };
  }
}