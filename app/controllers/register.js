import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class RegisterController extends Controller {
  @service router;
  @service session;
  @service store;
  @service toast;

  @tracked isFormLoading = false;

  @action
  async handleRegister(event) {
    event.preventDefault();

    this.isFormLoading = true;

    try {
      const user = await this.model.save();

      await this.session.authenticate('authenticator:application', {
        id: user.password,
        userId: user.id,
        email: user.email,
        passwordToken: user.passwordToken,
        isFromRegister: true,
      });

      this.toast.success('User has been created succesfully', 'Success');
      this.router.transitionTo('index');
    } catch (error) {
      this.model.rollbackAttributes();
      this.toast.error('Something went wrong, please try again', 'Error');
    } finally {
      this.isFormLoading = false;
    }
  }
}
