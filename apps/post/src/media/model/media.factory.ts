import { Media, MediaType } from '@app/common/types/media';
import { $Enums, Prisma } from '@prisma/prisma-post-client';

export class MediaBuilder implements Prisma.MediaCreateWithoutPostInput {
  postId: string;
  url: string;
  type: $Enums.MediaType;
  width?: number;
  height?: number;
  duration?: number;

  setPostId(postId: string): MediaBuilder {
    this.postId = postId;
    return this;
  }

  setUrl(url: string): MediaBuilder {
    this.url = url;
    return this;
  }

  setType(type: MediaType): MediaBuilder {
    this.type = $Enums.MediaType[MediaType[type]];
    return this;
  }

  setWidth(width: number): MediaBuilder {
    this.width = width;
    return this;
  }

  setHeight(height: number): MediaBuilder {
    this.height = height;
    return this;
  }

  setDuration(duration: number): MediaBuilder {
    this.duration = duration;
    return this;
  }

  build(): Prisma.MediaCreateWithoutPostInput {
    return {
      url: this.url,
      type: this.type,
      width: this.width,
      height: this.height,
    };
  }
}

class Video implements Media {
  id: number;
  postId: string;
  url: string;
  type: MediaType;
  duration: number;
}

class Audio implements Media {
  id: number;
  postId: string;
  url: string;
  type: MediaType;
  duration: number;
}

class MediaFactory {
  private constructor() {}
}
