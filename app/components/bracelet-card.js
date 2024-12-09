import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class BraceletCardComponent extends Component {
  get maskedApiKey() {
    const key = this.args.model.apiKey || '';
    return key.slice(0, 5) + '*****' + key.slice(-3);
  }

  @action
  deleteBracelet(id) {
    if (this.args.deleteBracelet) {
      this.args.deleteBracelet(id);
    }
  }
}
