import Model, { attr, belongsTo } from '@ember-data/model';

export default class BraceletModel extends Model {
  @attr('string') name;
  @attr('string') brand;
  @attr('string') model;
  @attr('string') apiKey;

  @belongsTo('user', { async: false, inverse: null }) user;
}
