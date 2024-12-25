import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class MyAccountController extends Controller {
  @service router;
  @service session;
  @service store;
  @service toast;

  @tracked isBraceletFormModalOpen = false;
  @tracked selectedUserId = null;

  isDoctor = this.session.data.authenticated.isDoctor;

  @action
  goHome() {
    this.router.transitionTo('index');
  }

  @action
  assignDoctor() {
    if (!this.selectedUserId) return;

    let user = this.store.peekRecord('user', this.selectedUserId);
    if (!user) return;

    let newId = this.session.data.authenticated.userId;
    user.doctor = this.store.peekRecord('doctor', newId);

    user.save().then(() => {
      this.toast.success('Patient associated correctly');
      this.router.refresh();
    });
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

  @action
  removePatient(patientId) {
    if (!patientId) return;

    let user = this.store.peekRecord('user', patientId);
    if (!user) return;

    user.doctor = null;

    user.save().then(() => {
      this.toast.success('Patient removed correctly');
      this.router.refresh();
    });
  }

  @action
  deletePatient(patientId) {
    this.store
      .findRecord('user', patientId, { backgroundReload: false })
      .then((user) => user.destroyRecord());
  }
}
