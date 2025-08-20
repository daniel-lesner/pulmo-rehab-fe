import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import {
  DATA_TYPES,
  DISPLAY_TITLES,
  INTERVAL_TYPES,
  INTERVAL_LABELS,
  CHARTABLE_TYPES,
  RAW_SERIES_TYPES,
} from 'pulmo-rehab-fe/utils/dashboard-constants';

export default class DashboardController extends Controller {
  @service store;
  @service toast;
  @service router;

  queryParams = ['braceletId'];

  @tracked bracelet = null;
  @tracked braceletId = null;
  @tracked data = null;
  @tracked isDataLoading = false;
  @tracked selectedDataType = 'stats';
  @tracked selectedTimeIntervalInMinutes = '60';
  @tracked selectedDate = new Date().toISOString().split('T')[0];

  get dataTypes() {
    return DATA_TYPES;
  }

  get title() {
    return (
      DISPLAY_TITLES[this.selectedDataType] ??
      this.selectedDataType
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/^\w/, (c) => c.toUpperCase())
    );
  }

  get shouldShowTimeInterval() {
    return CHARTABLE_TYPES.includes(this.selectedDataType);
  }

  get intervalOptions() {
    const wantsThree = ['stress', 'bodyBatteryLevel'].includes(
      this.selectedDataType,
    );
    const set = wantsThree ? INTERVAL_TYPES.with3Min : INTERVAL_TYPES.with2Min;
    return set.map((v) => ({ value: v, label: INTERVAL_LABELS[v] }));
  }

  @action goHome() {
    this.router.transitionTo('index');
  }
  @action onDateChange(e) {
    this.selectedDate = e.target.value;
  }

  @action onDataTypeSelect(e) {
    this.selectedDataType = e.target.value;
    const available = this.intervalOptions.map((o) => o.value);
    if (
      this.shouldShowTimeInterval &&
      !available.includes(this.selectedTimeIntervalInMinutes)
    ) {
      this.selectedTimeIntervalInMinutes = available.at(-1);
    }
    this.getData(e);
  }

  @action onTimeIntervalInMinutesChange(e) {
    this.selectedTimeIntervalInMinutes = e.target.value;
  }

  @action async getData(event) {
    if (event?.preventDefault) event.preventDefault();
    this.isDataLoading = true;

    try {
      const payload = {
        braceletId: this.braceletId,
        dataType: this.selectedDataType,
        date: this.selectedDate,
        timeIntervalInMinutes: this.selectedTimeIntervalInMinutes,
      };

      this.bracelet = this.store.createRecord('dashboard', payload);
      await this.bracelet.save();
      const raw = this.bracelet?.data;

      if (RAW_SERIES_TYPES.includes(this.selectedDataType)) {
        this.data = raw ? { ...raw } : {};

        if (this.selectedDataType === 'sleep') {
          const makeChart = (series, label) => {
            if (!series) return null;
            const labels = Object.keys(series);
            const values = Object.values(series);
            return {
              labels,
              datasets: [
                {
                  label,
                  data: values,
                  fill: false,
                  borderColor: 'rgb(75,192,192)',
                  tension: 0.1,
                },
              ],
            };
          };
          this.data.timeOffsetSleepRespiration = makeChart(
            raw?.timeOffsetSleepRespiration,
            'Sleep Respiration (RPM)',
          );
          this.data.timeOffsetSleepSpo2 = makeChart(
            raw?.timeOffsetSleepSpo2,
            'Sleep SpO2 %',
          );
        }

        if (
          this.selectedDataType === 'epochs' ||
          this.selectedDataType === 'activities'
        ) {
          if (Array.isArray(raw)) {
            this.data = raw;
          } else if (raw && Array.isArray(raw.data)) {
            this.data = raw.data;
          } else {
            this.data = [];
          }
        }
      } else {
        const labels = raw ? Object.keys(raw) : [];
        const values = raw ? Object.values(raw) : [];
        this.data = {
          labels,
          datasets: [
            {
              label: this.title,
              data: values,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
          ],
        };
      }
    } catch (e) {
      this.toast?.error?.('Something went wrong, please try again.');
      this.data = null;
    } finally {
      this.isDataLoading = false;
    }
  }
}
