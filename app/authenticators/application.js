import EmberSimpleAuthBaseAuthenticatior from 'ember-simple-auth/authenticators/base';
import { inject as service } from '@ember/service';

export default class ApplicationAuthenticator extends EmberSimpleAuthBaseAuthenticatior {
  @service store;

  async authenticate(params) {
    if (params.isFromRegister) {
      return {
        id: params.id,
        userId: params.userId,
        email: params.email,
        passwordToken: params.passwordToken,
      };
    }

    const session = this.store.createRecord('session', params);
    await session.save();

    return {
      id: session.id,
      userId: session.userId,
      email: session.email,
      passwordToken: session.passwordToken,
    };
  }

  async restore(data) {
    if (data.passwordToken) return data;

    throw new Error('No valid password token found');
  }

  async invalidate() {
    return;
  }
}
