import { Controller } from '@nestjs/common';
import { SocialAuthService } from './social-auth.service';

@Controller()
export class SocialAuthController {
  constructor(private readonly socialAuthService: SocialAuthService) {}

  
  getHello(): string {
    return this.socialAuthService.getHello();
  }
}
