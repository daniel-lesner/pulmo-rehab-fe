import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class DashboardController extends Controller {
  @service store;
  @service toast;

  @tracked bracelet = null;
  @tracked braceletId = null;
  @tracked data = null;
  @tracked isDataLoading = false;
  @tracked selectedDataType = 'stats';
  @tracked selectedTimeIntervalInMinutes = 60;

  queryParams = ['braceletId'];

  selectedDate = new Date().toISOString().split('T')[0];

  get title() {
    if (this.selectedDataType === 'heartRate') {
      return 'Heart Rate (BPM)';
    } else if (this.selectedDataType === 'hrv') {
      return 'Heart Rate Variability (ms)';
    } else if (this.selectedDataType === 'spo2') {
      return 'SpO2 %';
    } else if (this.selectedDataType === 'respiration') {
      return 'Respiration (RPM)';
    }

    return this.selectedDataType
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/^\w/, (c) => c.toUpperCase());
  }

  get shouldShowTimeInterval() {
    return ['heartRate', 'stress', 'bodyBatteryLevel', 'spo2'].includes(
      this.selectedDataType,
    );
  }

  get shouldShowThreeMinInterval() {
    return ['stress', 'bodyBatteryLevel'].includes(this.selectedDataType);
  }

  @action
  goHome() {
    this.router.transitionTo('index');
  }

  @action
  async getData(event) {
    event.preventDefault();

    this.isDataLoading = true;

    try {
      this.bracelet = this.store.createRecord('dashboard', {
        braceletId: this.braceletId,
        dataType: this.selectedDataType,
        date: this.selectedDate,
        timeIntervalInMinutes: this.selectedTimeIntervalInMinutes,
      });

      await this.bracelet.save();

      if (
        ['stats', 'fitnessAge', 'activities', 'epochs'].includes(
          this.selectedDataType,
        )
      ) {
        this.data = this.bracelet.data;
      } else {
        this.data = {
          labels: Object.keys(this.bracelet.data),
          datasets: [
            {
              label: this.title,
              data: Object.values(this.bracelet.data),
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
          ],
        };
      }
    } catch (error) {
      this.toast.error('Something went wrong, please try again.');
    } finally {
      this.isDataLoading = false;
    }
  }

  @action
  onDataTypeSelect(event) {
    this.selectedDataType = event.target.value;

    if (this.shouldShowThreeMinInterval) {
      if (this.selectedTimeIntervalInMinutes === '2') {
        this.selectedTimeIntervalInMinutes = '3';
      }
    } else {
      if (this.selectedTimeIntervalInMinutes === '3') {
        this.selectedTimeIntervalInMinutes = '2';
      }
    }

    this.getData(event);
  }

  @action
  onDateChange(event) {
    this.selectedDate = event.target.value;
  }

  @action
  onTimeIntervalInMinutesChange(event) {
    this.selectedTimeIntervalInMinutes = event.target.value;
  }
}
