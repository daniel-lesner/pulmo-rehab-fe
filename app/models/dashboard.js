import Model, { attr } from '@ember-data/model';

export default class Dashboard extends Model {
  @attr('number') heartRate;
  @attr('string') stress;
  @attr('string') spo2;
  @attr('string') respiration;
}
