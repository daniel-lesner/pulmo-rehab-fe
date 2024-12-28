import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class SubmitButtonComponent extends Component {
  @action
  handleClick(event) {
    if (this.args.onClick) this.args.onClick(event);
  }
}
