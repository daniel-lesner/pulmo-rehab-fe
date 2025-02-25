import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
  @service router;
  @service session;
  @service intl;

  @action
  goHome() {
    this.router.transitionTo('index');
  }

  @action
  toggleLocale() {
    let current = this.intl.locale[0];
    this.intl.setLocale([current === 'en' ? 'ro' : 'en']);
  }
}
