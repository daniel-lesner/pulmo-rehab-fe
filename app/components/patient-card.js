import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class PatientCardComponent extends Component {
  @action
  removePatient(id) {
    if (this.args.removePatient) {
      this.args.removePatient(id);
    }
  }
}
