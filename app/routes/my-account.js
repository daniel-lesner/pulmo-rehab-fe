import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class MyAccountRoute extends Route {
  @service session;
  @service store;

  @service router;

  beforeModel(transition) {
    if (!this.session.isAuthenticated) {
      this.session.attemptedTransition = transition;
    }
  }

  model() {
    if (!this.session.isAuthenticated) {
      return { isAuthenticated: false };
    } else {
      return this.store.findRecord(
        'user',
        this.session.data.authenticated.userId,
      );
    }
  }
}
