import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class LoginFormComponent extends Component {
  @service session;
  @service router;

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

      this.router.transitionTo('my-account');
    } catch (error) {
      alert('Authentication failed, please check your credentials.');
    }
  }
}
