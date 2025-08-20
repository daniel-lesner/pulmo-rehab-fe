import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

const POLLUTION_METRIC_RANGES_LOCAL = [
  {
    key: 'pm2_5',
    label: 'PM2.5',
    breakpoints: [12, 35.4, 55.4, 150.4],
    max: 150.4,
  },
  { key: 'pm10', label: 'PM10', breakpoints: [54, 154, 254, 354], max: 354 },
];

export default class LocalAirPollutionController extends Controller {
  @service store;
  @service toast;

  @tracked deviceId = null;
  @tracked model = null;

  @action
  async fetchLocal() {
    if (!this.deviceId) {
      this.toast?.error?.('Missing deviceId for local air sensor.');
      return;
    }
    try {
      const rec = this.store.createRecord('local-air-pollution', {
        deviceId: this.deviceId,
      });
      await rec.save();
      this.model = rec;
    } catch (e) {
      this.model = null;
      this.toast.error('Failed to fetch local sensor data.');
      console.error(e);
    }
  }

  get pollutants() {
    const m = this.model;
    if (!m) return [];

    const safeNum = (x) => (Number.isFinite(Number(x)) ? Number(x) : 0);

    return POLLUTION_METRIC_RANGES_LOCAL.map((p) => {
      const val = safeNum(m[p.key]);
      let aqi = 1;
      if (val > p.breakpoints[3]) aqi = 5;
      else if (val > p.breakpoints[2]) aqi = 4;
      else if (val > p.breakpoints[1]) aqi = 3;
      else if (val > p.breakpoints[0]) aqi = 2;

      const percent = Math.min(100, Math.round((val / p.max) * 100));

      return {
        label: p.label,
        value: val.toFixed(1),
        aqi,
        percent,
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

  get extras() {
    const m = this.model;
    if (!m) return [];
    const pick = (label, key, unit = '') => {
      const v = m[key];
      if (v === null || v === undefined) return null;
      return {
        label,
        value: typeof v === 'number' ? v.toFixed(1) : String(v),
        unit,
      };
    };
    return [
      pick('Temperature', 'temperature_c', '°C'),
      pick('Humidity', 'humidity', '%'),
      pick('CO₂', 'co2', 'ppm'),
      pick('TVOC', 'tvoc', 'ppb'),
      pick('HCHO', 'hcho', 'ppb'),
      pick('CO', 'co', 'ppm'),
      pick('Battery', 'batteryPercentage', '%'),
      pick('Charging', 'charging', ''),
      pick('AQI (device)', 'aqi_label', ''),
    ].filter(Boolean);
  }
}
