import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class UsersEditRoute extends Route {
  @service store;
  @service session;
  @service router;

  async model(params) {
    const currentUserId = this.session.data.authenticated.userId;

    const user = await this.store.findRecord('user', params.user_id, {
      include: 'healthDatum',
      reload: true,
    });

    if (params.user_id == currentUserId || user.doctor.id == currentUserId) {
      let healthDatum =
        user.healthDatum || this.store.createRecord('health-datum', { user });

      return { user, healthDatum };
    }

    return this.router.transitionTo('my-account');
  }
}
