import { NotificationType } from '@app/common/types/notification';
import * as Handlebars from 'handlebars';

Handlebars.registerHelper('gt', function (a: number, b: number) {
  return a > b;
});

Handlebars.registerHelper('subtract', function (a: number, b: number) {
  return a - b;
});

const templates = {
  like: Handlebars.compile(
    '{{ subjectName }}{{#if (gt subjectCount 1) }} và {{ subtract subjectCount 1 }} người khác{{/if}} đã thích bài viết của bạn: "{{ diContent }}"',
  ),
  comment: Handlebars.compile(
    '{{ subjectName }}{{#if (gt subjectCount 1) }} và {{ subtract subjectCount 1 }} người khác{{/if}} đã bình luận về bài viết của bạn: "{{ diContent }}"',
  ),
  follow: Handlebars.compile('{{ subjectName }} đã theo dõi bạn'),
};

export const generateNotificationContent = (
  subjectName: string,
  subjectCount: number,
  notificationType: number,
  diContent: string,
) => {
  const data = {
    subjectName: subjectName,
    subjectCount: subjectCount,
    diContent:
      diContent && countWords(diContent) > 5
        ? getFirstWords(diContent, 5) + '...'
        : diContent,
  };

  let text = '';
  const highlights = [];

  switch (notificationType) {
    case 1:
      text = templates.like(data);
      break;

    case 2:
      text = templates.comment(data);
      break;

    case 3:
      text = templates.follow(data);
      break;

    default:
      text = '';
  }

  const offset = text.indexOf(subjectName);
  highlights.push({
    length: subjectName.length,
    offset: offset,
  });

  return {
    text: text,
    highlights: highlights,
  };
};

export function generateUrl(type: number, id: string) {
  switch (type) {
    case 1:
      return `/post/${id}`;
    case 2:
      return `/post/${id}`;
    case 3:
      return `/profile/${id}`;
    default:
      return '';
  }
}

export function getNotificationType(stringKey: string): NotificationType {
  switch (stringKey) {
    case 'comment':
      return NotificationType.COMMENT;
    case 'like':
      return NotificationType.LIKE;
    case 'follow':
      return NotificationType.FOLLOW;
    default:
      return NotificationType.OTHER;
  }
}

export function getFirstWords(text: string, numberOfWord: number): string {
  const words = text.split(' ');
  const firstWords = words.slice(0, numberOfWord).join(' ');
  return firstWords;
}

export function countWords(str: string): number {
  return str.trim().split(/\s+/).length;
}
