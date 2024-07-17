import * as Handlebars from 'handlebars';

Handlebars.registerHelper('gt', function (a: number, b: number) {
  return a > b;
});

Handlebars.registerHelper('subtract', function (a: number, b: number) {
  return a - b;
});

const templates = {
  like: Handlebars.compile(
    '{{ subjectName }}{{#if (gt subjectCount 1) }} và {{ subtract subjectCount 1 }} người khác{{/if}} đã thích bài viết của bạn.',
  ),
  comment: Handlebars.compile(
    '{{ subjectName }}{{#if (gt subjectCount 1) }} và {{ subtract subjectCount 1 }} người khác{{/if}} đã bình luận về bài viết của bạn: "{{ diContent }}"',
  ),
  follow: Handlebars.compile('{{ subjectName }} gửi yêu cầu theo dõi bạn'),
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
    diContent: diContent + '...',
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
