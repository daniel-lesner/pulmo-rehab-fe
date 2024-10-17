import Model, { attr } from '@ember-data/model';

export default class SessionModel extends Model {
  @attr('number') userId;
  @attr('string') email;
  @attr('string') password;
  @attr('string') passwordToken;
}
