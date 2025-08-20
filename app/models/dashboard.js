import Model, { attr } from '@ember-data/model';

export default class DashboardModel extends Model {
  @attr('string') braceletId;
  @attr('string') dataType;
  @attr('string') date;
  @attr('number') timeIntervalInMinutes;
  @attr() data;
}
