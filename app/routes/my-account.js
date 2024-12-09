import { inject as service } from '@ember/service';
import AuthenticatedRoute from './authenticated';

export default class MyAccountRoute extends AuthenticatedRoute {
  @service store;

  model() {
    return this.store.findRecord(
      'user',
      this.session.data.authenticated.userId,
      { include: 'bracelets' },
    );
  }
}
