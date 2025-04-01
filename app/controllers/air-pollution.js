import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class AirPollutionController extends Controller {
  @service store;

  @tracked model = null;
  @tracked latitude = null;
  @tracked longitude = null;

  constructor() {
    super(...arguments);
    this.getLocation();
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;

          let record = this.store.createRecord('air-pollution', {
            lat: this.latitude,
            lon: this.longitude,
          });

          await record.save();
          this.model = record;
        },
        (error) => {
          console.error('Geolocation error:', error.message);
        },
      );
    } else {
      console.error('Geolocation not supported by this browser.');
    }
  }
}
