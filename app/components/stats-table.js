import Component from '@glimmer/component';

export default class StatsTableComponent extends Component {
  get lastUpdateAt() {
    const date = new Date(
      (this.args.model.startTimeInSeconds +
        this.args.model.startTimeOffsetInSeconds +
        this.args.model.durationInSeconds) *
        1000,
    );

    return date.toISOString().split('T')[1].split('.')[0];
  }
}
