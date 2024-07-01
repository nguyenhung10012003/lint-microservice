import { Replies, Reply, ReplyDto, ReplyId, ReplyParams, ReplyServiceController, ReplyServiceControllerMethods, ReplyUpdateDto, ReplyWhereUnique } from "@app/common/types/comment";
import { Controller } from "@nestjs/common";
import { Observable } from "rxjs";

@Controller()
@ReplyServiceControllerMethods()
export class ReplyController implements ReplyServiceController{
  create(request: ReplyDto): Reply | Promise<Reply> | Observable<Reply> {
    throw new Error("Method not implemented.");
  }
  delete(request: ReplyId): Reply | Promise<Reply> | Observable<Reply> {
    throw new Error("Method not implemented.");
  }
  find(request: ReplyParams): Replies | Promise<Replies> | Observable<Replies> {
    throw new Error("Method not implemented.");
  }
  findOne(request: ReplyWhereUnique): Reply | Promise<Reply> | Observable<Reply> {
    throw new Error("Method not implemented.");
  }
  update(request: ReplyUpdateDto): Reply | Promise<Reply> | Observable<Reply> {
    throw new Error("Method not implemented.");
  }
}