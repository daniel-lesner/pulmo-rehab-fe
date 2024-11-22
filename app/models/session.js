import Model, { attr } from '@ember-data/model';
// import { validator, buildValidations } from 'ember-cp-validations';

// const Validations = buildValidations({
//   email: [validator('presence', true), validator('format', { type: 'email' })],
//   password: [validator('presence', true)],
// });

export default class SessionModel extends Model {
  // export default class SessionModel extends Model.extend(Validations) {
  @attr('number') userId;
  @attr('string') email;
  @attr('string') password;
  @attr('string') passwordToken;
}
