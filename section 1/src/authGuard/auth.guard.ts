
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from 'src/routes/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly authService: AuthService) { }
    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization.split(' ')[1];
        if (!token) {
            throw new UnauthorizedException('No token provided');
        }
        try {
            const decoded = await this.authService.verifyToken(token)
            const isActive = decoded.isActive
            if (isActive === false) {
                throw new UnauthorizedException('User is not active');
            }
            request.user = decoded
            return true
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
        return true
    }
}
