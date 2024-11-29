import { inject as service } from '@ember/service';
import AuthenticatedRoute from './authenticated';

export default class DashboardRoute extends AuthenticatedRoute {
  @service store;

  model() {
    return this.store.createRecord('dashboard');
  }
}
