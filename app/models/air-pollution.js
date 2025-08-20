import Model, { attr } from '@ember-data/model';

export default class AirPollutionModel extends Model {
  @attr('string') mode;

  @attr('string') lat;
  @attr('string') lon;

  @attr('number') co;
  @attr('number') no;
  @attr('number') no2;
  @attr('number') o3;
  @attr('number') so2;
  @attr('number') pm2_5;
  @attr('number') pm10;
  @attr('number') nh3;
  @attr('number') dt;

  @attr('string') deviceId;
  @attr('number') pm0_3;
  @attr('number') pm1;
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
