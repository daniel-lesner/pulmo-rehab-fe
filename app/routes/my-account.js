import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { hash } from 'rsvp';
import AuthenticatedRoute from './authenticated';

export default class MyAccountRoute extends AuthenticatedRoute {
  @service store;
  @service session;

  @tracked user = this.session.data.authenticated;

  model() {
    if (this.user.isDoctor) {
      return hash({
        doctor: this.store.findRecord('doctor', this.user.userId, {
          include: 'users',
        }),

        unassignedUsers: this.store.query('user', {
          filter: {
            doctor_id: 'null',
          },
        }),

        assignedUsers: this.store.query('user', {
          filter: {
            doctor_id: this.user.userId,
          },
          include: 'bracelets',
        }),
      });
    }

    return this.store.findRecord(
      'user',
      this.session.data.authenticated.userId,
      { include: 'bracelets' },
    );
  }
}
