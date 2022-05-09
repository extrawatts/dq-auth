import { Inject, Injectable } from '@nestjs/common';
import supertokens from 'supertokens-node';
import Session from 'supertokens-node/recipe/session';
import ThirdParty from 'supertokens-node/recipe/thirdparty';
import { ConfigInjectionToken, AuthModuleConfig } from '../config.interface';

@Injectable()
export class SupertokensService {
  constructor(@Inject(ConfigInjectionToken) private config: AuthModuleConfig) {
    supertokens.init({
      appInfo: config.appInfo,
      supertokens: {
        connectionURI: config.connectionURI,
        apiKey: config.apiKey,
      },
      recipeList: [
        ThirdParty.init({
          signInAndUpFeature: {
            providers: [
              // We have provided you with development keys which you can use for testsing.
              // IMPORTANT: Please replace them with your own OAuth keys for production use.
              ThirdParty.Google({
                clientId:
                  '1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com',
                clientSecret: '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',
              }),
              ThirdParty.Github({
                clientId: '467101b197249757c71f',
                clientSecret: 'e97051221f4b6426e8fe8d51486396703012f5bd',
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
          },
        }),

        Session.init(),
      ],
    });
  }
}
