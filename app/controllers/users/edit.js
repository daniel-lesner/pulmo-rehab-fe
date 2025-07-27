import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class UsersEditController extends Controller {
  @service router;
  @service toast;

  @action
  async save(event) {
    event.preventDefault();

    try {
      await this.model.healthDatum.save();
      await this.model.user.save();

      this.toast.success('User has been updated succesfully!');
    } catch (error) {
      error.errors.forEach((err) => this.toast.error(err.detail));
    }
  }

  @action
  onGenderChange(event) {
    this.model.healthDatum.gender = event.target.value;
  }
}
