// NotificationStrategy interface
export interface NotificationStrategy {
  getText(data: any): string;
}

// LikeNotificationStrategy class
export class LikeNotificationStrategy implements NotificationStrategy {
  getText(data: any): string {
    return `${data.subjects[0].name} đã thích bài viết của bạn.`;
  }
}

// CommentNotificationStrategy class
export class CommentNotificationStrategy implements NotificationStrategy {
  getText(data: any): string {
    return `${data.subjects[0].name} đã bình luận vào bài viết trong ${data.pr_object.name}.`;
  }
}

// ReplyNotificationStrategy class
export class ReplyNotificationStrategy implements NotificationStrategy {
  getText(data: any): string {
    return `${data.subjects[0].name} đã trả lời bình luận của ${data.in_object.name} trong ${data.pr_object.name}.`;
  }
}

// NotificationContext class
export class NotificationContext {
  private strategy: NotificationStrategy;

  constructor(strategy: NotificationStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: NotificationStrategy) {
    this.strategy = strategy;
  }

  getText(data: any): string {
    return this.strategy.getText(data);
  }
}
