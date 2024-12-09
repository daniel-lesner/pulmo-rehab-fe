import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class BraceletFormModalComponent extends Component {
  @service router;
  @service store;
  @service session;

  name = '';
  brand = '';
  apiKey = '';

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
      const userId = this.session.data.authenticated.userId;
      const user = await this.store.findRecord('user', userId);

      const bracelet = this.store.createRecord('bracelet', {
        name: this.name,
        brand: this.brand,
        apiKey: this.apiKey,
        user: user,
      });

      await bracelet.save();

      this.router.refresh();

      this.args.closeModal();
    } catch (error) {
      alert('Authentication failed, please check your credentials.');
    }
  }
}
