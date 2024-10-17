import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class MyAccountController extends Controller {
  @service router;
  @service session;

  @action
  goHome() {
    this.router.transitionTo('index');
  }
}
