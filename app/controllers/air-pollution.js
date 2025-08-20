import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

const RANGE_MAP = {
  pm2_5: { label: 'PM2.5', breakpoints: [12, 35.4, 55.4, 150.4], max: 150.4 },
  pm10: { label: 'PM10', breakpoints: [54, 154, 254, 354], max: 354 },
  so2: { label: 'SO₂', breakpoints: [75, 185, 304, 604], max: 604 },
  no2: { label: 'NO₂', breakpoints: [53, 100, 360, 649], max: 649 },
  o3: { label: 'O₃', breakpoints: [70, 120, 180, 240], max: 240 },
  co: { label: 'CO', breakpoints: [4400, 9400, 12400, 15400], max: 15400 },
  nh3: { label: 'NH₃', breakpoints: [20, 40, 60, 80], max: 100 },
  no: { label: 'NO', breakpoints: [20, 40, 60, 80], max: 100 },
  co2: { label: 'CO₂', breakpoints: [800, 1200, 1500, 2000], max: 2000 },
  hcho: { label: 'HCHO', breakpoints: [50, 100, 200, 300], max: 300 },
  tvoc: { label: 'TVOC', breakpoints: [100, 200, 400, 600], max: 600 },
  pm1: { label: 'PM1', breakpoints: [12, 35.4, 55.4, 150.4], max: 150.4 },
  pm0_3: { label: 'PM0.3', breakpoints: [12, 35.4, 55.4, 150.4], max: 150.4 },
};

export default class AirPollutionController extends Controller {
  @service store;
  @service toast;

  @tracked mode = 'openweather';
  @tracked latitude = null;
  @tracked longitude = null;
  @tracked deviceId = null;

  @tracked model = null;

  @action
  toggleSource(e) {
    this.mode = e.target.checked ? 'local' : 'openweather';
    this.model = null;
  }

  @action switchMode(mode) {
    this.mode = mode;
    this.model = null;
  }

  @action async fetchLocal() {
    if (!this.deviceId) {
      this.toast?.error?.('Missing deviceId for local air sensor.');
      return;
    }
    try {
      const rec = this.store.createRecord('air-pollution', {
        mode: 'local',
        deviceId: this.deviceId,
      });
      await rec.save();
      this.model = rec;
    } catch (e) {
      this.model = null;
      this.toast?.error?.('Failed to fetch local sensor data.');
    }
  }

  @action getLocation() {
    if (!navigator.geolocation) {
      this.toast?.error?.('Geolocation not supported by this browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        this.latitude = coords.latitude;
        this.longitude = coords.longitude;
        try {
          const rec = this.store.createRecord('air-pollution', {
            mode: 'openweather',
            lat: this.latitude,
            lon: this.longitude,
          });
          await rec.save();
          this.model = rec;
        } catch {
          this.model = null;
          this.toast?.error?.('Failed to fetch OpenWeather data.');
        }
      },
      (err) => this.toast?.error?.(`Geolocation error: ${err.message}`),
    );
  }

  get pollutants() {
    const m = this.model;
    if (!m) return [];
    const keys = Object.keys(RANGE_MAP);

    const rows = [];
    for (const key of keys) {
      const raw = m[key];
      const val = Number(raw);
      if (!Number.isFinite(val)) continue;

      const r = RANGE_MAP[key];
      let aqi = 1;
      if (val > r.breakpoints[3]) aqi = 5;
      else if (val > r.breakpoints[2]) aqi = 4;
      else if (val > r.breakpoints[1]) aqi = 3;
      else if (val > r.breakpoints[0]) aqi = 2;

      rows.push({
        key,
        label: r.label,
        value: val.toFixed(1),
        aqi,
        percent: Math.min(100, Math.round((val / r.max) * 100)),
        aqiLabel: [
          'Good',
          'Moderate',
          'Sensitive',
          'Unhealthy',
          'Very Unhealthy',
        ][aqi - 1],
      });
    }

    const order = [
      'pm2_5',
      'pm10',
      'pm1',
      'pm0_3',
      'co',
      'no',
      'no2',
      'o3',
      'so2',
      'nh3',
      'co2',
      'tvoc',
      'hcho',
    ];
    rows.sort((a, b) => order.indexOf(a.key) - order.indexOf(b.key));
    return rows;
  }

  get extras() {
    if (!this.model || this.mode !== 'local') return [];
    const m = this.model;

    const add = (label, key, unit = '') => {
      const v = m[key];
      if (v === null || v === undefined) return null;
      return {
        label,
        value: typeof v === 'number' ? v.toFixed(1) : String(v),
        unit,
      };
    };

    return [
      add('Temperature', 'temperature_c', '°C'),
      add('Humidity', 'humidity', '%'),
      add('CO₂', 'co2', 'ppm'),
      add('TVOC', 'tvoc', 'ppb'),
      add('HCHO', 'hcho', 'ppb'),
      add('CO', 'co', 'ppm'),
      add('Battery', 'batteryPercentage', '%'),
      add('Charging', 'charging', ''),
      add('AQI (device)', 'aqi_label', ''),
    ].filter(Boolean);
  }
}
