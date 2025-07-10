import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class BraceletFormModalComponent extends Component {
  @service router;
  @service store;
  @service session;
  @service toast;

  @tracked brand = 'Garmin';

  name = '';
  model = '';
  token = '';
  tokenSecret = '';
  brandOptions = ['Garmin', 'Huawei', 'Fitbit'];

  @action
  closeModal() {
    this.args.closeModal();
  }

  @action
  stopPropagation(event) {
    event.stopPropagation();
  }

  @action
  async createBracelet(event) {
    event.preventDefault();

    try {
      const bracelet = this.store.createRecord('bracelet', {
        name: this.name,
        brand: this.brand,
        model: this.model,
        token: this.token,
        tokenSecret: this.tokenSecret,
      });

      await bracelet.save();

      this.router.refresh();

      this.args.closeModal();
    } catch (error) {
      error.errors.forEach((e) => this.toast.error(e.detail));
      this.toast.error('Something went wrong, please try again.');
    }
  }
}
