export const fileAccept = [
  'jpeg',
  'png',
  'webp',
  'svg',
  'mp3',
  'mp4',
  'webm',
  'm4a',
  'flv',
  'avi',
  'mov',
  'wmv',
  'weba',
  'ogg',
];

export const fileAcceptReg = new RegExp(`.(${fileAccept.join('|')})$`);
