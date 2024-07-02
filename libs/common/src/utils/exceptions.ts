import {
  GrpcAlreadyExistsException,
  GrpcNotFoundException,
  GrpcUnavailableException,
} from 'nestjs-grpc-exceptions';

export const ERROR_TO_GRPC: Record<string, any> = {
  P2002: new GrpcAlreadyExistsException('Already exists'),
  P2023: new GrpcUnavailableException('Unavailable'),
  P2025: new GrpcNotFoundException('Not found'),
};
