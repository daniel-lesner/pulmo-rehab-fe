import Component from '@glimmer/component';

export default class SleepTableComponent extends Component {
  // helper local pentru afișare minute + ore
  formatMinutesAndHours(seconds) {
    if (!seconds) return '—';
    const minutes = Math.floor(seconds / 60);
    const hours = (minutes / 60).toFixed(1); // o zecimală, ex: 6.5
    return `${minutes} (${hours} hours)`;
  }

  get rows() {
    const m = this.args.model ?? {};
    return [
      [
        'Start Time',
        this.args.formatDatetime?.(
          m.startTimeInSeconds,
          m.startTimeOffsetInSeconds,
        ),
      ],
      ['Total Sleep', this.formatMinutesAndHours(m.durationInSeconds)],
      ['Deep Sleep', this.formatMinutesAndHours(m.deepSleepDurationInSeconds)],
      [
        'Light Sleep',
        this.formatMinutesAndHours(m.lightSleepDurationInSeconds),
      ],
      ['REM Sleep', this.formatMinutesAndHours(m.remSleepInSeconds)],
      ['Awake Time', this.formatMinutesAndHours(m.awakeDurationInSeconds)],
      [
        'Total Nap Duration',
        this.formatMinutesAndHours(m.totalNapDurationInSeconds),
      ],
      [
        'Unmeasurable Time',
        this.formatMinutesAndHours(m.unmeasurableSleepInSeconds),
      ],
      [
        'Overall Sleep Score',
        m.overallSleepScore
          ? `${m.overallSleepScore.value} (${m.overallSleepScore.qualifierKey})`
          : '—',
      ],
    ];
  }
}
