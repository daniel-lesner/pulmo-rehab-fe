import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class UsersEditRoute extends Route {
  @service store;
  @service session;
  @service router;

  model(params) {
    if (params.user_id != this.session.data.authenticated.userId) {
      return this.router.transitionTo('my-account');
    }

    return this.store.findRecord(
      'user',
      this.session.data.authenticated.userId,
    );
  }
}
