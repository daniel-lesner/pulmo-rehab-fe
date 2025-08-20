import Model, { attr } from '@ember-data/model';

export default class LocalAirPollutionModel extends Model {
  @attr('string') deviceId;
  @attr('number') dt;
  @attr('number') pm2_5;
  @attr('number') pm10;
  @attr('number') co;
  @attr('number') co2;
  @attr('number') tvoc;
  @attr('number') hcho;
  @attr('number') temperature_c;
  @attr('number') humidity;
  @attr('number') batteryPercentage;
  @attr('boolean') charging;
  @attr('number') aqi_level;
  @attr('string') aqi_label;
}
