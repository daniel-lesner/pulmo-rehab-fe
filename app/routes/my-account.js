import { inject as service } from '@ember/service';
import { hash } from 'rsvp';
import AuthenticatedRoute from './authenticated';

export default class MyAccountRoute extends AuthenticatedRoute {
  @service store;
  @service session;

  model() {
    const currentUser = this.session.data.authenticated;
    const userId = currentUser.userId;
    const isDoctor = currentUser.isDoctor;

    if (isDoctor) {
      return hash({
        doctor: this.store.findRecord('doctor', userId, {
          include: 'users',
        }),

        unassignedUsers: this.store.query('user', {
          filter: {
            doctor_id: 'null',
          },
        }),
        assignedUsers: this.store.query('user', {
          filter: {
            doctor_id: userId,
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
