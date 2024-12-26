import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class BraceletCardComponent extends Component {
  get maskedToken() {
    const key = this.args.model.token || '';
    return key.slice(0, 5) + '*****' + key.slice(-3);
  }

  get maskedTokenSecret() {
    const key = this.args.model.tokenSecret || '';
    return key.slice(0, 5) + '*****' + key.slice(-3);
  }

  @action
  deleteBracelet(id) {
    if (this.args.deleteBracelet) {
      this.args.deleteBracelet(id);
    }
  }
}
