import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseTagsPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value.tags) {
      return value;
    }
    if (typeof value.tags === 'string') {
      value.tags = [value.tags];
    } else if (!Array.isArray(value.tags)) {
      throw new BadRequestException('Invalid tags format');
    }
    return value;
  }
}
