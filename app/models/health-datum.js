import Model, { attr, belongsTo } from '@ember-data/model';

export default class HealthDatumModel extends Model {
  @attr('number') age;
  @attr('string') gender;
  @attr('number') weight;
  @attr('number') height;
  @attr('boolean') smoker;

  @attr('string') primaryDiagnosis;
  @attr('string') copdStage;
  @attr('boolean') respiratoryFailure;

  @attr('string') angina;
  @attr('string') hypertension;
  @attr('boolean') venousInsufficiency;

  @attr('number') spo2;
  @attr('string') bp;
  @attr('number') heartRate;

  @attr('number') fev1;
  @attr('number') ipb;
  @attr('number') fvc;

  @attr('string') biseptol;
  @attr('boolean') labaLama;
  @attr('boolean') ics;
  @attr('string') acc;
  @attr('string') ventolin;

  @belongsTo('user', { async: false, inverse: 'healthDatum' }) user;
}
