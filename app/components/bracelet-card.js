import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class BraceletCardComponent extends Component {
  @action
  deleteBracelet(id) {
    if (this.args.deleteBracelet) {
      this.args.deleteBracelet(id);
    }
  }
}
