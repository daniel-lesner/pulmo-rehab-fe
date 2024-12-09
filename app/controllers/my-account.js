import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class MyAccountController extends Controller {
  @service router;
  @service session;
  @service store;

  @tracked isBraceletFormModalOpen = false;

  @action
  goHome() {
    this.router.transitionTo('index');
  }

  @action
  deleteBracelet(braceletId) {
    this.store
      .findRecord('bracelet', braceletId, { backgroundReload: false })
      .then((bracelet) => bracelet.destroyRecord());
  }

  @action
  openBraceletFormModal() {
    this.isBraceletFormModalOpen = true;
  }

  @action
  closeBraceletFormModal() {
    this.isBraceletFormModalOpen = false;
  }
}
