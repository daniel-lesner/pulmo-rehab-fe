import ApplicationSerializer from './application';

export default class UserSerializer extends ApplicationSerializer {
  serialize(snapshot, options) {
    let json = super.serialize(snapshot, options);

    if (!json.data.attributes.password) {
      delete json.data.attributes.password;
    }

    if (!json.data.attributes.passwordToken) {
      delete json.data.attributes.passwordToken;
    }

    return json;
  }
}
