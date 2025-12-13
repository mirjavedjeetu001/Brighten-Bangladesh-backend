import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Allows requests without Authorization header while still authenticating when a JWT is provided.
@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers?.authorization;

    // If no Authorization header, skip JWT guard and allow anonymous access.
    if (!authHeader) {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    // On token errors, treat as anonymous instead of throwing.
    if (err || info) {
      return null;
    }
    return user || null;
  }
}