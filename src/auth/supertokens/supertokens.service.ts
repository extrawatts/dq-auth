import { Inject, Injectable } from '@nestjs/common';
import supertokens from 'supertokens-node';
import Session from 'supertokens-node/recipe/session';
import ThirdParty from 'supertokens-node/recipe/thirdparty';
import ThirdPartyPasswordless from 'supertokens-node/recipe/thirdpartypasswordless';
import EmailPassword from 'supertokens-node/recipe/emailpassword';

import { ConfigInjectionToken, AuthModuleConfig } from '../config.interface';
import { EmailService } from '../email/email.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SupertokensService {
  constructor(
    @Inject(ConfigInjectionToken) private config: AuthModuleConfig,
    private emailProvider: EmailService,
  ) {
    supertokens.init({
      appInfo: config.appInfo,
      supertokens: {
        connectionURI: config.connectionURI,
        apiKey: config.apiKey,
      },
      recipeList: [
        ThirdPartyPasswordless.init({
          flowType: 'MAGIC_LINK',
          contactMethod: 'EMAIL',
          createAndSendCustomEmail: async (input) => {
            await this.emailProvider.sendSuperTokensEmail(
              input.urlWithLinkCode,
              input.userInputCode,
              input.codeLifetime,
              input.email,
            );
          },
          providers: [
            // We have provided you with development keys which you can use for testsing.
            // IMPORTANT: Please replace them with your own OAuth keys for production use.
            ThirdParty.Google({
              clientId:
                '1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com',
              clientSecret: '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',
            }),
            ThirdParty.Apple({
              clientId: '4398792-io.supertokens.example.service',
              clientSecret: {
                keyId: '7M48Y4RYDL',
                privateKey:
                  '-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgu8gXs+XYkqXD6Ala9Sf/iJXzhbwcoG5dMh1OonpdJUmgCgYIKoZIzj0DAQehRANCAASfrvlFbFCYqn3I2zeknYXLwtH30JuOKestDbSfZYxZNMqhF/OzdZFTV0zc5u5s3eN+oCWbnvl0hM+9IW0UlkdA\n-----END PRIVATE KEY-----',
                teamId: 'YWQCXGJRJL',
              },
            }),

            // ThirdParty.Facebook({
            //     clientSecret: "FACEBOOK_CLIENT_SECRET",
            //     clientId: "FACEBOOK_CLIENT_ID"
            // })
          ],
        }),
        EmailPassword.init(),
        Session.init(),
      ],
    });
  }
}
