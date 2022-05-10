import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModuleConfig, ConfigInjectionToken } from './config.interface';
import { SupertokensService } from './supertokens/supertokens.service';
import { AuthMiddleware } from './auth.middleware';
import { CustomAuthService } from './custom-auth/custom-auth.service';
import { EmailService } from './email/email.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  exports: [],
  imports: [ConfigModule],
  providers: [
    {
      useFactory: (config: ConfigService): AuthModuleConfig => {
        return {
          appInfo: {
            appName: config.get('APP_NAME'),
            apiDomain: config.get('API_DOMAIN'),
            websiteDomain: config.get('WEBSITE_DOMAIN'),
            apiBasePath: config.get('API_BASE_PATH'),
            websiteBasePath: config.get('WEBSITE_BASE_PATH'),
          },
          connectionURI: config.get('SUPERTOKENS_CONNECTION_URI'),
          apiKey: config.get('SUPERTOKENS_API_KEY'),
        };
      },
      inject: [ConfigService],
      provide: ConfigInjectionToken,
    },
    EmailService,
    SupertokensService,
    CustomAuthService,
  ],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
