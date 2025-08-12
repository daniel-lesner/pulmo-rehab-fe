import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class AiChatController extends Controller {
  @service ai;

  @tracked messages = [];
  @tracked input = '';
  @tracked loading = false;
  @tracked contextId = null;

  @action
  _scrollToBottom(el) {
    el.scrollTop = el.scrollHeight;
  }

  @action
  updateInput(e) {
    this.input = e.target.value;
  }

  @action
  handleKeydown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this.send();
    }
  }

  @action
  async send() {
    const text = (this.input || '').trim();
    if (!text || this.loading) return;

    this.messages = [...this.messages, { role: 'user', text }];
    this.input = '';
    this.loading = true;

    try {
      const { reply, suggestions, contextId } = await this.ai.sendMessage({
        text,
        contextId: this.contextId,
      });

      this.contextId = contextId ?? this.contextId;

      this.messages = [
        ...this.messages,
        {
          role: 'ai',
          text: reply || 'Nu am găsit o recomandare.',
          suggestions: suggestions || [],
        },
      ];
    } catch (e) {
      this.messages = [
        ...this.messages,
        { role: 'ai', text: 'A apărut o eroare. Încearcă din nou.' },
      ];
    } finally {
      this.loading = false;

      requestAnimationFrame(() => {
        const box = document.querySelector('.ai-chat__box');
        if (box) box.scrollTop = box.scrollHeight;
      });
    }
  }
}
