import Component from '@glimmer/component';

export default class EpochsTableComponent extends Component {
  get rows() {
    const m = this.args.model;
    if (Array.isArray(m)) return m;
    if (m && Array.isArray(m.data)) return m.data;
    return [];
  }
}
