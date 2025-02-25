import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class Header extends Component {
  @service router;
  @service session;
  @service intl;

  @tracked isLoginModalOpen = false;

  get languageSet() {
    return this.intl._locale[0];
  }

  @action
  logOut() {
    this.session.invalidate();
    this.router.transitionTo('index');
  }

  @action
  openLoginModal() {
    this.isLoginModalOpen = true;
  }

  @action
  closeLoginModal() {
    this.isLoginModalOpen = false;
  }

  @action
  toggleLocale() {
    this.intl.setLocale([this.languageSet === 'en-us' ? 'ro-ro' : 'en-us']);
  }
}
