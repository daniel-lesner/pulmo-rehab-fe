import Model, { attr } from '@ember-data/model';

export default class AirPollution extends Model {
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
}
