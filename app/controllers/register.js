import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class RegisterController extends Controller {
  @service router;
  @service session;
  @service store;
  @service toast;

  @tracked isDoctor = false;
  @tracked isFormLoading = false;
  @tracked isPrivacyPolicyAgreed = false;

  queryParams = ['isDoctor'];

  @action
  async handleRegister(event) {
    event.preventDefault();

    this.isFormLoading = true;

    try {
      const user = this.isDoctor
        ? await this.model.doctor.save()
        : await this.model.patient.save();

      await this.session.authenticate('authenticator:application', {
        id: user.password,
        userId: user.id,
        email: user.email,
        passwordToken: user.passwordToken,
        isFromRegister: true,
        isDoctor: this.isDoctor,
      });

      this.toast.success('User has been created succesfully', 'Success');
      this.router.transitionTo('index');
    } catch (error) {
      error.errors.forEach((err) => this.toast.error(err.detail, err.title));
    } finally {
      this.isFormLoading = false;
    }
  }
}
