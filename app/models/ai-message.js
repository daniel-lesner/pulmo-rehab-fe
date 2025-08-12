import Model, { attr } from '@ember-data/model';

export default class AiMessageModel extends Model {
  @attr('string') prompt;
  @attr('string') reply;
  @attr('string') userId;
  @attr('string') contextId;
  @attr() suggestions;
}
