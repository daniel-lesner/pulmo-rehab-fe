import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { inject as service } from '@ember/service';
import { camelize } from '@ember/string';
import { pluralize } from 'ember-inflector';
import config from '../config/environment';

export default class ApplicationAdapter extends JSONAPIAdapter {
  @service session;

  namespace = 'api/v1';

  get headers() {
    const headers = {};

    if (this.session.isAuthenticated) {
      headers['Authorization'] =
        `Bearer ${this.session.data.authenticated.passwordToken}`;
    }

    return headers;
  }

  get host() {
    return config.APP.API_HOST;
  }

  pathForType(modelName) {
    return pluralize(camelize(modelName));
  }
}
