import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

const POLLUTION_METRIC_RANGES = [
  {
    key: 'pm2_5',
    label: 'PM2.5',
    breakpoints: [12, 35.4, 55.4, 150.4],
    max: 150.4,
  },
  {
    key: 'pm10',
    label: 'PM10',
    breakpoints: [54, 154, 254, 354],
    max: 354,
  },
  {
    key: 'so2',
    label: 'SO₂',
    breakpoints: [75, 185, 304, 604],
    max: 604,
  },
  {
    key: 'no2',
    label: 'NO₂',
    breakpoints: [53, 100, 360, 649],
    max: 649,
  },
  {
    key: 'o3',
    label: 'O₃',
    breakpoints: [70, 120, 180, 240],
    max: 240,
  },
  {
    key: 'co',
    label: 'CO',
    breakpoints: [4400, 9400, 12400, 15400],
    max: 15400,
  },
  {
    key: 'nh3',
    label: 'NH₃',
    breakpoints: [20, 40, 60, 80],
    max: 100,
  },
  {
    key: 'no',
    label: 'NO',
    breakpoints: [20, 40, 60, 80],
    max: 100,
  },
];

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

  get pollutants() {
    const model = this.model;

    if (!model) return [];

    return POLLUTION_METRIC_RANGES.map((p) => {
      const val = model[p.key];
      let aqi = 1;
      if (val > p.breakpoints[3]) aqi = 5;
      else if (val > p.breakpoints[2]) aqi = 4;
      else if (val > p.breakpoints[1]) aqi = 3;
      else if (val > p.breakpoints[0]) aqi = 2;

      return {
        label: p.label,
        value: val.toFixed(1),
        aqi,
        percent: Math.min(100, Math.round((val / p.max) * 100)),
        aqiLabel: [
          'Good',
          'Moderate',
          'Sensitive',
          'Unhealthy',
          'Very Unhealthy',
        ][aqi - 1],
      };
    });
  }
}
