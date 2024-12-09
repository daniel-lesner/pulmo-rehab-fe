import Model, { attr, hasMany } from '@ember-data/model';

export default class UserModel extends Model {
  @attr('string') email;
  @attr('string') name;
  @attr('string') password;
  @attr('string') passwordToken;

  @hasMany('bracelet', { async: true, inverse: null }) bracelets;
}
