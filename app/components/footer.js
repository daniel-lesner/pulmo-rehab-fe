import Component from '@glimmer/component';

export default class Footer extends Component {
  get currentYear() {
    return new Date().getFullYear();
  }
}
