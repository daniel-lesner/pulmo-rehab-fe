import Model, { attr, hasMany } from '@ember-data/model';

export default class DoctorModel extends Model {
  @attr('string') email;
  @attr('string') name;
  @attr('string') password;
  @attr('string') registrationKey;
  @attr('string') passwordToken;

  @hasMany('user', { async: true, inverse: null }) users;
}
