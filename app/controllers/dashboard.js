import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class DashboardController extends Controller {
  @service store;
  @service toast;

  @tracked bracelet = null;
  @tracked braceletId = null;
  @tracked chartData = null;
  @tracked isDataLoading = false;
  @tracked selectedDataType = 'heartRate';

  queryParams = ['braceletId'];

  selectedDate = null;

  get title() {
    return this.selectedDataType
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/^\w/, (c) => c.toUpperCase());
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
      });

      await this.bracelet.save();

      this.chartData = {
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
    } catch (error) {
      this.toast.error('Something went wrong, please try again.');
    } finally {
      this.isDataLoading = false;
    }
  }

  @action
  onDataTypeSelect(event) {
    this.selectedDataType = event.target.value;
    this.getData(event);
  }

  @action
  onDateChange(event) {
    this.selectedDate = event.target.value;
    this.getData(event);
  }
}
