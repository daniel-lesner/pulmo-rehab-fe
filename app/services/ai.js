import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default class AiService extends Service {
  @service session;
  @service store;

  async sendMessage({ text }) {
    let userId = this.session.data.authenticated.userId;

    const record = this.store.createRecord('ai-message', {
      prompt: text,
      userId,
    });

    try {
      const saved = await record.save();
      const payload = {
        id: saved.id ?? null,
        reply: saved.reply ?? '',
        suggestions: saved.suggestions ?? [],
      };
      saved.unloadRecord();
      return payload;
    } catch (e) {
      if (record && record.isNew) record.rollbackAttributes();
      throw e;
    }
  }
}
