import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class LoginModalComponent extends Component {
  @service session;
  @service router;
  @service store;

  email = '';
  password = '';

  @action
  async authenticate(event) {
    event.preventDefault();

    try {
      await this.session.authenticate('authenticator:application', {
        email: this.email,
        password: this.password,
      });

      this.closeLoginModal();
      this.router.transitionTo('my-account');
    } catch (error) {
      alert('Authentication failed, please check your credentials.');
    }
  }

  @action
  closeLoginModal() {
    this.args.closeLoginModal();
  }

  @action
  stopPropagation(event) {
    event.stopPropagation();
  }
}
