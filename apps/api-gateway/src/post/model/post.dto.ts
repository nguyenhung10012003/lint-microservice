import { PostScope } from '@app/common/types/post';

export interface PostDto {
  content?: string;
  views?: number;
  share?: number;
  tags?: string[];
  sourceId?: string;
  scope?: PostScope;
}
