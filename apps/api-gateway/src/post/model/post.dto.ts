import { PostScope } from '@app/common/types/post';
import { Transform } from 'stream';

export interface PostDto {
  content?: string;
  views?: number;
  share?: number;
  tags?: string[];
  sourceId?: string;
  scope?: PostScope;
}
